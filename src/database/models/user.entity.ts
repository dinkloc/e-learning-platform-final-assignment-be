import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import * as bcrypt from 'bcrypt';
import { Exclude, Transform } from 'class-transformer';
import * as moment from 'moment';
import { Enrollment } from './enrollment.entity';

export enum UserRole {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
}

export enum UserGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum UserStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  BANNED = 'BANNED',
  DELETED = 'DELETED',
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: true })
  @ApiProperty()
  email: string;

  @Column({ length: 255, nullable: true })
  @Exclude()
  password: string;

  @OneToMany(() => Enrollment, enrollment => enrollment.user)
  enrollments: Enrollment[];

  @Column({ length: 100, default: '', nullable: true, name: 'first_name' })
  @ApiProperty()
  firstName: string;

  @Column({ length: 100, default: '', nullable: true, name: 'last_name' })
  @ApiProperty()
  lastName: string;

  @Column({ length: 100, default: '', nullable: true, name: 'user_name' })
  @ApiProperty()
  userName: string;

  @Column({ nullable: true })
  @ApiProperty()
  avatar: string;

  @Column({ length: 15, nullable: true, name: 'phone_number' })
  @ApiProperty()
  phoneNumber: string;

  @Column({
    type: 'enum',
    enum: UserGender,
    nullable: true,
  })
  @ApiProperty()
  gender: UserGender;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  @ApiProperty()
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.PENDING,
  })
  @ApiProperty()
  status: UserStatus;

  @Column({ name: 'email_verified', default: false })
  @ApiProperty()
  emailVerified: boolean;

  @Column({ type: 'timestamp', nullable: true, name: 'deleted_at' })
  @Transform(({ value }) => moment(value).unix())
  @ApiProperty({ type: 'number', example: 1546300800 })
  deletedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ type: 'string', format: 'date-time' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({ type: 'string', format: 'date-time' })
  updatedAt: Date;

  @Column({ name: 'is_first_login', type: 'boolean', default: true })
  @ApiProperty()
  isFirstLogin: boolean;


  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
      } catch (error) {
        console.log(error);
      }
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    if (!this.password) {
      return false;
    }
    return bcrypt.compare(password, this.password);
  }
}
