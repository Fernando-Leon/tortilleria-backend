import { Permission } from "../../permission/entities/permission.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('feature')
export class Feature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @OneToMany(() => Permission, (permission) => permission.feature)
  permissions: Permission[];
}