import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { Status } from "src/catalogs/status/status.entity";
import { Profile } from "src/profile/entities/profile.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { profileId, statusId, ...userData } = createUserDto;
    const profile = await this.profileRepository.findOneBy({ id: profileId });
    const status = await this.statusRepository.findOneBy({ id: statusId });

    if (!status) {
      throw new Error('Status not found');
    }

    if (!profile) {
      throw new Error('Profile not found');
    }

    const user = this.usersRepository.create({
      ...userData,
      profile,
      status,
    });

    return await this.usersRepository.save(user);
  }

  async findOneByName(name: string) {
    return await this.usersRepository.findOneBy({ name });
  }

  async findById(id: number) {
    return await this.usersRepository.findOne({ 
      where: { id },
      select: ["id", "name"],
      relations: ["profile", "status"],
     });
  }

  findAll() {
    return this.usersRepository.find({ 
      select: ["id", "name"],
      relations: ["profile", "status"],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { profileId, statusId, ...userData } = updateUserDto;
  
    let status;
    let profile;
    if (statusId && profileId) {
      status = await this.statusRepository.findOneBy({ id: statusId });
      profile = await this.profileRepository.findOneBy({ id: profileId });
      if (!status) {
        throw new Error('Status not found');
      }
      if (!profile) {
        throw new Error('Profile not found');
      }
    }
  
    const updatedUserData = {
      ...userData,
      ...(profile && { profile }),
      ...(status && { status }),
    };
  
    await this.usersRepository.update(id, updatedUserData);
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['profile', 'status'],
    });
  
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
  
    return user;
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (user) {
      await this.usersRepository.remove(user);
      return { message: "User deleted successfully" };
    }
    throw new Error("User not found");
  }
}