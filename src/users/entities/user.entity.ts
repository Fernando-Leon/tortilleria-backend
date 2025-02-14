import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sex } from "../../catalogs/sex/sex.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  mail: string;

  @ManyToOne(() => Sex, (sex) => sex.users)
  @JoinColumn({ name: "sexId" })
  sex: Sex;

  @Column()
  sexId: number;
}
