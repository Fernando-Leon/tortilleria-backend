import { User } from "../../users/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('status')
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 70 })
  description: string;

  @OneToMany(() => User, (user) => user.status)
  users: User[];
}