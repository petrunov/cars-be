import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {
  IsNotEmpty,
  IsInt,
  IsDecimal,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'cars' })
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty()
  @IsString()
  make: string;

  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty()
  @IsString()
  model: string;

  @Column({ type: 'int' })
  @IsInt()
  year: number;

  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty()
  @IsString()
  engine: string;

  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty()
  @IsString()
  type: string;

  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty()
  @IsString()
  gearbox: string;

  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty()
  @IsString()
  car_condition: string;

  @Column({ type: 'int' })
  @IsInt()
  hp: number;

  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty()
  @IsString()
  color: string;

  @Column({ type: 'int', precision: 10, scale: 2 })
  @IsInt()
  price: number;

  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty()
  @IsString()
  city: string;

  @Column({ type: 'int' })
  @IsNotEmpty()
  @IsInt()
  mileage: number;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  extras: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'user_id', type: 'int', unsigned: true })
  @IsInt()
  userId: number;

  @ManyToOne(() => User, (user) => user.cars, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
