import { Module } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { FeatureController } from './feature.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from './entities/feature.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { PermissionModule } from 'src/permission/permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([Feature, Profile]), PermissionModule],
  controllers: [FeatureController],
  providers: [FeatureService],
  exports: [TypeOrmModule],
})
export class FeatureModule {}
