import { Status } from "../../catalogs/status/status.entity";
import { Profile } from "../../profile/entities/profile.entity";
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

  @ManyToOne(() => Profile, (profile) => profile.users)
  profile: Profile;

  @ManyToOne(() => Status, (status) => status.users)
  status: Status;
}