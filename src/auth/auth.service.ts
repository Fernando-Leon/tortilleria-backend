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
      name: user.name,
      permissions: permissions.map(permission => ({
        id: permission.id,
        canRead: permission.canRead,
        canCreate: permission.canCreate,
        canUpdate: permission.canUpdate,
        canDelete: permission.canDelete,
        featureName: permission.feature.name,
      })),
    };
  }
}