import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { User } from "src/users/entities/user.entity";

@Entity("sexs")
export class Sex {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => User, (user) => user.sex)
  users: User[];
}
