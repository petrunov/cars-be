import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username } = createUserDto;
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });

    if (existingUser) {
      throw new BadRequestException('Username is already taken');
    }

    const user = new User();
    user.username = createUserDto.username;
    user.password = await bcrypt.hash(createUserDto.password, 10);
    return this.userRepository.save(user);
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }
}
