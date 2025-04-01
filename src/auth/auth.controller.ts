import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./guard/auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get("permissions/:id")
  async getPermissions(@Param("id") id: string) {
    const { permissions } = await this.authService.getPermissionsByUserId(+id);
    return permissions;
  }

  @Get("test")
  @UseGuards(AuthGuard)
  test() {
    return "Hello World";
  }
}