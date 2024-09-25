import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RefreshToken } from './RefreshToken.entity';

@Entity({ name: 'tbl_user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'fisrt_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'phone' })
  phone: string;

  @Column({ name: 'password' })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.id)
  refreshToken: RefreshToken[];
}
