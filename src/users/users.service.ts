import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { Status } from "src/catalogs/status/status.entity";
import { Role } from "src/catalogs/roles/role.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { roleId, statusId, ...userData } = createUserDto;
    const role = await this.roleRepository.findOneBy({ id: roleId });
    const status = await this.statusRepository.findOneBy({ id: statusId });

    if (!status) {
      throw new Error('Status not found');
    }

    if (!role) {
      throw new Error('Role not found');
    }

    const user = this.usersRepository.create({
      ...userData,
      role,
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
      relations: ["role", "status"],
     });
  }

  findAll() {
    return this.usersRepository.find({ 
      select: ["id", "name"],
      relations: ["role", "status"],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { roleId, statusId, ...userData } = updateUserDto;
  
    let status;
    let role;
    if (statusId && roleId) {
      status = await this.statusRepository.findOneBy({ id: statusId });
      role = await this.roleRepository.findOneBy({ id: roleId });
      if (!status) {
        throw new Error('Status not found');
      }
      if (!role) {
        throw new Error('Role not found');
      }
    }
  
    const updatedUserData = {
      ...userData,
      ...(role && { role }),
      ...(status && { status }),
    };
  
    await this.usersRepository.update(id, updatedUserData);
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['role', 'status'],
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