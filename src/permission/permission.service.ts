import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { Profile } from "../profile/entities/profile.entity";
import { Feature } from "../feature/entities/feature.entity";
import { UpdatePermissionBooleansDto } from './dto/update-permission-boolean.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission) private permissionRepository: Repository<Permission>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Feature) private featureRepository: Repository<Feature>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const profile = await this.profileRepository.findOne({ where: { id: createPermissionDto.profileId } });
    const feature = await this.featureRepository.findOne({ where: { id: createPermissionDto.featureId } });
  
    if (!profile || !feature) {
      throw new Error('Profile or Feature not found');
    }
  
    const permission = this.permissionRepository.create({
      ...createPermissionDto,
      profile,
      feature,
      canCreate: false,
      canRead: false,
      canUpdate: false,
      canDelete: false,
    });
  
    return this.permissionRepository.save(permission);
  }

  async createMany(createPermissionDtos: CreatePermissionDto[]) {
    const permissions = await Promise.all(createPermissionDtos.map(async dto => {
      const profile = await this.profileRepository.findOne({ where: { id: dto.profileId } });
      const feature = await this.featureRepository.findOne({ where: { id: dto.featureId } });
  
      if (!profile || !feature) {
        throw new Error('Profile or Feature not found');
      }
  
      return this.permissionRepository.create({
        ...dto,
        profile,
        feature,
        canCreate: false,
        canRead: false,
        canUpdate: false,
        canDelete: false,
      });
    }));
  
    return this.permissionRepository.save(permissions);
  }

  findAll() {
    return this.permissionRepository.find({ relations: ["profile", "feature"] });
  }

  findOne(id: number) {
    return this.permissionRepository.findOne({ where: { id }, relations: ["profile", "feature"] });
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const profile = await this.profileRepository.findOne({ where: { id: updatePermissionDto.profileId } });
    const feature = await this.featureRepository.findOne({ where: { id: updatePermissionDto.featureId } });
  
    if (!profile || !feature) {
      throw new Error('Profile or Feature not found');
    }
  
    const permission = await this.permissionRepository.findOne({ where: { id }, relations: ["profile", "feature"] });
  
    if (!permission) {
      throw new Error('Permission not found');
    }
  
    permission.profile = profile;
    permission.feature = feature;
    permission.canCreate = updatePermissionDto.canCreate ?? permission.canCreate;
    permission.canRead = updatePermissionDto.canRead ?? permission.canRead;
    permission.canUpdate = updatePermissionDto.canUpdate ?? permission.canUpdate;
    permission.canDelete = updatePermissionDto.canDelete ?? permission.canDelete;
  
    return this.permissionRepository.save(permission);
  }

  remove(id: number) {
    return this.permissionRepository.delete(id);
  }

  findAllByProfileId(profileId: number) {
    return this.permissionRepository.find({ where: { profile: { id: profileId } }, relations: ["feature"] });
  }

  async findAllByProfileIdAuth(profileId: number) {
    return this.permissionRepository.find({
      where: { profile: { id: profileId } },
      relations: ['feature'],
      select: ['id', 'canRead', 'canCreate', 'canUpdate', 'canDelete', 'feature'],
    });
  }

  async findAllPermissionsByProfileId(profileId: number) {
    return this.permissionRepository.find({
      where: { profile: { id: profileId } },
      relations: ['profile', 'feature'],
      select: {
        id: true,
        canCreate: true,
        canRead: true,
        canUpdate: true,
        canDelete: true,
        profile: { id: true, name: true },
        feature: { id: true, name: true },
      },
    });
  }

  async updateBooleans(id: number, updatePermissionBooleansDto: UpdatePermissionBooleansDto) {
  const permission = await this.permissionRepository.findOne({ where: { id }, relations: ["profile", "feature"] });

  if (!permission) {
    throw new Error('Permission not found');
  }

  permission.canCreate = updatePermissionBooleansDto.canCreate ?? permission.canCreate;
  permission.canRead = updatePermissionBooleansDto.canRead ?? permission.canRead;
  permission.canUpdate = updatePermissionBooleansDto.canUpdate ?? permission.canUpdate;
  permission.canDelete = updatePermissionBooleansDto.canDelete ?? permission.canDelete;

  return this.permissionRepository.save(permission);
}
}
