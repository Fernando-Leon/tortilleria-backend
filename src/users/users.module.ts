import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { StatusModule } from "src/catalogs/status/status.module";
import { ProfileModule } from "src/profile/profile.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), StatusModule, ProfileModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
