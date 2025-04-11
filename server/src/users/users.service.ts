// src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(name: string, email: string): Promise<User> {
    const user = this.usersRepository.create({ name, email });
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async update(id: number, name: string, email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');

    user.name = name;
    user.email = email;
    return await this.usersRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    const result = await this.usersRepository.delete({ id });
    if (result.affected === 0) throw new NotFoundException('User not found');
  }
}
