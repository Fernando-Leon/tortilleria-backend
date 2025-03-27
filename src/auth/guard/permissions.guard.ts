import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { jwtConstants } from "../constants/jwt.constant";

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request.user = payload;

      const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());
      if (!requiredPermissions) {
        return true;
      }

      const userPermissions = payload.permissions;
      const hasPermission = requiredPermissions.every(permission => {
        const [action, feature] = permission.split(':');
        return userPermissions.some(userPermission =>
          userPermission.feature.name === feature &&
          userPermission[`can${action.charAt(0).toUpperCase() + action.slice(1)}`]
        );
      });

      if (!hasPermission) {
        throw new ForbiddenException({
          message: "No tienes permisos para acceder a este recurso",
          error: "Forbidden",
          statusCode: 403
        });
      }

      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}