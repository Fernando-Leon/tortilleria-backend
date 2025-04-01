import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcryptjs from "bcryptjs";
import { UsersService } from "src/users/users.service";
import { LoginDto } from "./dto/login.dto";
import { PermissionService } from "src/permission/permission.service";

export interface TransformedPermission {
  id: number;
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  name: string;
  route: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly permissionService: PermissionService
  ) {}

  async register({ name, password, profileId, statusId }: RegisterDto) {
    const user = await this.usersService.findOneByName(name);

    if (user) {
      throw new BadRequestException("El nombre de usuario ya existe");
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await this.usersService.create({
      name,
      password: hashedPassword,
      profileId,
      statusId,
    });

    return {
      message: "User created successfully",
    };
  }

  async login({ name, password }: LoginDto) {
    const user = await this.usersService.findOneByName(name);

    if (!user) {
      throw new UnauthorizedException("Invalid name");
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid password");
    }

    const permissions = await this.permissionService.findAllByProfileIdAuth(user.profile.id);

    const payload = { name: user.name, permissions };

    const token = await this.jwtService.signAsync(payload);

    return {
      token: token, 
      userId: user.id,
      name: user.name,
    };
  }

  async getPermissionsByUserId(userId: number): Promise<{ permissions: TransformedPermission[] }> {
    const user = await this.usersService.findById(userId);
  
    if (!user) {
      throw new UnauthorizedException("Invalid user");
    }
  
    const permissions = await this.permissionService.findAllByProfileIdAuth(user.profile.id);
  
    const transformedPermissions: TransformedPermission[] = permissions.map(permission => ({
      id: permission.id,
      canCreate: permission.canCreate,
      canRead: permission.canRead,
      canUpdate: permission.canUpdate,
      canDelete: permission.canDelete,
      name: permission.feature.name,
      route: permission.feature.route,
    }));
  
    return {
      permissions: transformedPermissions,
    };
  }
}