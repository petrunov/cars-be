import {
  Injectable,
  NotFoundException,
  // UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityNotFoundError } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  async create(createCarDto: CreateCarDto /*, userId: number*/): Promise<Car> {
    const newCar = this.carRepository.create(createCarDto);
    // newCar.user = { id: userId } as any;

    try {
      return await this.carRepository.save(newCar);
    } catch (error) {
      // Handle specific database errors if needed
      throw new Error('Failed to create car'); // Example of handling specific error
    }
  }

  async findAll(): Promise<Car[]> {
    try {
      return await this.carRepository.find();
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('Cars not found');
      }
      throw error;
    }
  }

  async findOne(id: number): Promise<Car> {
    try {
      return await this.carRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(`Car with id ${id} not found`);
      }
      throw error; // Throw other unexpected errors
    }
  }

  async update(
    id: number,
    updateCarDto: UpdateCarDto,
    // userId: number,
  ): Promise<Car> {
    try {
      // const car = await this.findOne(id);
      // if (car.user.id !== userId) {
      //   throw new UnauthorizedException(
      //     'You are not authorized to update this car',
      //   );
      // }
      await this.carRepository.update(id, updateCarDto);
      return this.findOne(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(`Car with id ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number /*, userId: number*/): Promise<void> {
    try {
      // const car = await this.findOne(id);
      // if (car.user.id !== userId) {
      //   throw new UnauthorizedException(
      //     'You are not authorized to delete this car',
      //   );
      // }
      await this.carRepository.delete(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(`Car with id ${id} not found`);
      }
      throw error;
    }
  }
}
