import { Profile } from "../../profile/entities/profile.entity";
import { Feature } from "../../feature/entities/feature.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('permission')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, (profile) => profile.permissions)
  profile: Profile;

  @ManyToOne(() => Feature, (feature) => feature.permissions)
  feature: Feature;

  @Column({ type: 'boolean' })
  canCreate: boolean;

  @Column({ type: 'boolean' })
  canRead: boolean;

  @Column({ type: 'boolean' })
  canUpdate: boolean;

  @Column({ type: 'boolean' })
  canDelete: boolean;
}