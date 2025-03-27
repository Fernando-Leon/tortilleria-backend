import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { Feature } from './entities/feature.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { PermissionService } from 'src/permission/permission.service';
import { Permission } from 'src/permission/entities/permission.entity';

@Injectable()
export class FeatureService {
  constructor(
    @InjectRepository(Feature) private featureRepository: Repository<Feature>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Permission) private permissionRepository: Repository<Permission>,
    private permissionService: PermissionService,
  ) {}

  async create(createFeatureDto: CreateFeatureDto) {
    const feature = await this.featureRepository.save(createFeatureDto);

    const profiles = await this.profileRepository.find();
    const permissions = profiles.map(profile => ({
      profileId: profile.id,
      featureId: feature.id,
      canCreate: false,
      canRead: false,
      canUpdate: false,
      canDelete: false,
    }));

    await this.permissionService.createMany(permissions);

    return feature;
  }

  findAll() {
    return this.featureRepository.find();
  }

  findOne(id: number) {
    return this.featureRepository.findOne({ where: { id } });
  }

  update(id: number, updateFeatureDto: UpdateFeatureDto) {
    return this.featureRepository.update(id, updateFeatureDto);
  }

  async remove(id: number) {
    await this.permissionRepository.delete({ feature: { id } });
    return this.featureRepository.delete(id);
  }
}
