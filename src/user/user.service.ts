/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/createUserDTO';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findOne(id: number) {
    return await this.userRepo.findOne({ where: { id: id } });
  }

  async createUser(CreateUserDto: CreateUserDto) {
    const user = this.userRepo.create(CreateUserDto);
    return await this.userRepo.save(user);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepo.update(id, updateUserDto);
  }
}
