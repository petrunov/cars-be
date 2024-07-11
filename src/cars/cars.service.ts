import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  async create(createCarDto: CreateCarDto): Promise<Car> {
    const newCar = this.carRepository.create(createCarDto);
    return await this.carRepository.save(newCar);
  }

  async findAll(): Promise<Car[]> {
    return await this.carRepository.find();
  }

  async findOne(id: number): Promise<Car> {
    return await this.carRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<Car> {
    await this.carRepository.update(id, updateCarDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.carRepository.delete(id);
  }
}
