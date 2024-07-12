import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';

import { Car } from './entities/car.entity';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.carsService.create(createCarDto);
  }

  @Get()
  findAll(): Promise<Car[]> {
    return this.carsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Car> {
    return this.carsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto,
  ): Promise<Car> {
    return this.carsService.update(+id, updateCarDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string): Promise<void> {
    return this.carsService.remove(+id);
  }
}
