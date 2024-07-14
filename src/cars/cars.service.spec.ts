import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CarsService } from './cars.service';
import { Car } from './entities/car.entity';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

describe('CarsService', () => {
  let service: CarsService;

  const mockCarRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const carArray = [
    { id: 1, make: 'Toyota', model: 'Camry', userId: 1 },
    { id: 2, make: 'Honda', model: 'Accord', userId: 1 },
  ];

  const oneCar = { id: 1, make: 'Toyota', model: 'Camry', userId: 1 };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarsService,
        {
          provide: getRepositoryToken(Car),
          useValue: mockCarRepository,
        },
      ],
    }).compile();

    service = module.get<CarsService>(CarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new car', async () => {
      const createCarDto: CreateCarDto = {
        make: 'Toyota',
        model: 'Camry',
        year: 2020,
        engine: 'V6',
        type: 'Sedan',
        gearbox: 'Automatic',
        car_condition: 'New',
        hp: 300,
        color: 'Red',
        price: 30000,
        city: 'New York',
        mileage: 0,
        extras: 'GPS',
      };
      mockCarRepository.create.mockReturnValue(oneCar);
      mockCarRepository.save.mockResolvedValue(oneCar);

      expect(await service.create(createCarDto, 1)).toEqual(oneCar);
      expect(mockCarRepository.create).toHaveBeenCalledWith({
        ...createCarDto,
        user: { id: 1 },
      });
      expect(mockCarRepository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of cars', async () => {
      mockCarRepository.find.mockResolvedValue(carArray);
      expect(await service.findAll()).toEqual(carArray);
      expect(mockCarRepository.find).toHaveBeenCalledWith({
        relations: ['user'],
      });
    });
  });

  describe('findOne', () => {
    it('should get a single car', async () => {
      mockCarRepository.findOne.mockResolvedValue(oneCar);
      expect(await service.findOne(1)).toEqual(oneCar);
      expect(mockCarRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw an error if car not found', async () => {
      mockCarRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a car', async () => {
      const updateCarDto: UpdateCarDto = {
        make: 'Toyota',
        model: 'Camry',
        year: 2021,
      };
      mockCarRepository.findOne.mockResolvedValue(oneCar);
      mockCarRepository.save.mockResolvedValue({ ...oneCar, ...updateCarDto });

      expect(await service.update(1, updateCarDto, 1)).toEqual({
        ...oneCar,
        ...updateCarDto,
      });
      expect(mockCarRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockCarRepository.save).toHaveBeenCalledWith({
        ...oneCar,
        ...updateCarDto,
      });
    });

    it('should throw an error if user is not the owner', async () => {
      const updateCarDto: UpdateCarDto = {
        make: 'Toyota',
        model: 'Camry',
        year: 2021,
      };
      mockCarRepository.findOne.mockResolvedValue({ ...oneCar, userId: 2 });

      await expect(service.update(1, updateCarDto, 1)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a car', async () => {
      mockCarRepository.findOne.mockResolvedValue(oneCar);
      mockCarRepository.remove.mockResolvedValue(null);

      expect(await service.remove(1, 1)).toBeUndefined();
      expect(mockCarRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockCarRepository.remove).toHaveBeenCalledWith(oneCar);
    });

    it('should throw an error if user is not the owner', async () => {
      mockCarRepository.findOne.mockResolvedValue({ ...oneCar, userId: 2 });

      await expect(service.remove(1, 1)).rejects.toThrow(ForbiddenException);
    });
  });
});
