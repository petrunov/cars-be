// cars/cars.service.ts

import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carsRepository: Repository<Car>,
  ) {}

  async create(createCarDto: CreateCarDto, userId: number): Promise<Car> {
    const car = this.carsRepository.create({
      ...createCarDto,
      user: { id: userId },
    });
    return this.carsRepository.save(car);
  }

  async findAll(): Promise<Car[]> {
    return this.carsRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Car> {
    const car = await this.carsRepository.findOne({ where: { id } });
    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
    return car;
  }

  async update(
    id: number,
    updateCarDto: UpdateCarDto,
    user: number,
  ): Promise<Car> {
    const car = await this.findOne(id);
    console.log(id, car, user);
    if (car.userId !== user) {
      throw new ForbiddenException('You are not allowed to update this car');
    }
    Object.assign(car, updateCarDto);
    return this.carsRepository.save(car);
  }

  async remove(id: number, user: number): Promise<void> {
    const car = await this.findOne(id);
    if (car.userId !== user) {
      throw new ForbiddenException('You are not allowed to delete this car');
    }
    await this.carsRepository.remove(car);
  }
}
