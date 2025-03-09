import { Status } from "../../catalogs/status/status.entity";
import { Role } from "../../catalogs/roles/role.entity";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 70, nullable: true })
  password: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @ManyToOne(() => Status, (status) => status.users)
  status: Status;
}