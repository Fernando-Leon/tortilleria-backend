import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { Feature } from '../feature/entities/feature.entity';
import { PermissionService } from '../permission/permission.service';
import { Permission } from '../permission/entities/permission.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Feature) private featureRepository: Repository<Feature>,
    @InjectRepository(Permission) private permissionRepository: Repository<Permission>,
    private permissionService: PermissionService,
  ) {}

  async create(createProfileDto: CreateProfileDto) {
    const existingProfile = await this.profileRepository.findOne({ where: { name: createProfileDto.name } });
    if (existingProfile) {
      return { message: 'El nombre debe ser diferente, ya existe un perfil con ese nombre.' };
    }

    const profile = await this.profileRepository.save(createProfileDto);

    const features = await this.featureRepository.find();
    const permissions = features.map(feature => ({
      profileId: profile.id,
      featureId: feature.id,
      canCreate: false,
      canRead: false,
      canUpdate: false,
      canDelete: false,
    }));

    await this.permissionService.createMany(permissions);

    return { message: 'Perfil creado exitosamente.' };
  }

  findAll() {
    return this.profileRepository.find();
  }

  findOne(id: number) {
    return this.profileRepository.findOne({ where: { id } });
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    const existingProfile = await this.profileRepository.findOne({ where: { id } });
    if (!existingProfile) {
      return { message: 'El perfil no existe.' };
    }

    const profileWithSameName = await this.profileRepository.findOne({ where: { name: updateProfileDto.name } });
    if (profileWithSameName && profileWithSameName.id !== id) {
      return { message: 'El nombre debe ser diferente, ya existe un perfil con ese nombre.' };
    }

    await this.profileRepository.update({ id }, updateProfileDto);
    return { message: 'Perfil actualizado correctamente.' };
  }

  async remove(id: number) {
    const existingProfile = await this.profileRepository.findOne({ where: { id } });
    if (!existingProfile) {
      return { message: 'El perfil no existe.' };
    }

    const usersWithProfile = await this.profileRepository.createQueryBuilder('profile')
      .leftJoinAndSelect('profile.users', 'user')
      .where('profile.id = :id', { id })
      .getOne();

    if (usersWithProfile && usersWithProfile.users && usersWithProfile.users.length > 0) {
      throw new HttpException('No se puede eliminar el perfil porque está asociado a uno o más usuarios', HttpStatus.BAD_REQUEST);
    }

    await this.permissionRepository.delete({ profile: { id } });
    await this.profileRepository.delete({ id });
    return { message: 'Perfil y permisos asociados eliminados exitosamente.' };
  }
}
