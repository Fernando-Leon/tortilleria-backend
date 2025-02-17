import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sex } from "./sex.entity";
import { SexsService } from "./sexs.service";
import { SexsController } from "./sexs.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Sex])],
  controllers: [SexsController],
  providers: [SexsService],
})
export class SexsModule {}
