import { IsString, IsInt, IsDecimal, IsOptional } from 'class-validator';

export class CreateCarDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsInt()
  year: number;

  @IsString()
  engine: string;

  @IsString()
  type: string;

  @IsString()
  gearbox: string;

  @IsString()
  condition: string;

  @IsInt()
  hp: number;

  @IsString()
  color: string;

  @IsDecimal()
  price: number;

  @IsString()
  city: string;

  @IsString()
  mileage: string;

  @IsOptional()
  @IsString()
  extras?: string;
}
