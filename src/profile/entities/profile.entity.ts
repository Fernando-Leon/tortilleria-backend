import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "../../users/entities/user.entity"
import { Permission } from "../../permission/entities/permission.entity"

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 70 })
  description: string;

  @OneToMany(() => User, (user) => user.profile)
  users: User[];

  @OneToMany(() => Permission, (permission) => permission.profile)
  permissions: Permission[];
}
