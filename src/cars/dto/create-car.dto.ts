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
  car_condition: string;

  @IsInt()
  hp: number;

  @IsString()
  color: string;

  @IsInt()
  price: number;

  @IsString()
  city: string;

  @IsInt()
  mileage: number;

  @IsOptional()
  @IsString()
  extras?: string;
}
