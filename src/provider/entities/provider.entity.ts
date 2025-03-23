import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('provider')
export class Provider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  description: string;
}