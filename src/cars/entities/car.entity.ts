import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsNotEmpty,
  IsInt,
  IsDecimal,
  IsOptional,
  IsString,
} from 'class-validator';

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
  condition: string;

  @Column({ type: 'int' })
  @IsInt()
  hp: number;

  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty()
  @IsString()
  color: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsDecimal()
  price: number;

  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty()
  @IsString()
  city: string;

  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty()
  @IsString()
  mileage: string;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  extras: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
