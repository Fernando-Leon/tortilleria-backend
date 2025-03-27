import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../profile/entities/profile.entity';
import { Feature } from '../feature/entities/feature.entity';
import { Permission } from './entities/permission.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Permission, Profile, Feature])],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [TypeOrmModule, PermissionService],
})
export class PermissionModule {}
