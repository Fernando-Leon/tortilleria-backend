import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Status } from "./status.entity";
import { StatusService } from "./status.service";
import { StatusController } from "./status.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Status])],
  controllers: [StatusController],
  providers: [StatusService],
  exports: [TypeOrmModule],
})
export class StatusModule {}