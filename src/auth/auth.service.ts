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

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ name, password, roleId, statusId  }: RegisterDto) {
    const user = await this.usersService.findOneByName(name);

    if (user) {
      throw new BadRequestException("El nombre de usuario ya existe");
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await this.usersService.create({
      name,
      password: hashedPassword,
      roleId,
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

    const payload = { name: user.name };

    const token = await this.jwtService.signAsync(payload);

    return {
      token: token, 
      name: user.name,
    };
  }
}