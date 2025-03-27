import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { FeatureModule } from '../feature/feature.module';
import { PermissionModule } from 'src/permission/permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), FeatureModule, PermissionModule],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [TypeOrmModule],
})
export class ProfileModule {}
