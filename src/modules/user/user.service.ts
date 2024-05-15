import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserRegisterDto } from '../auth/dto/user-register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(userRegisterDto: UserRegisterDto): Promise<User> {
    return await this.usersRepository.save(userRegisterDto);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
      relations: [],
    });
  }
  async findOneOrFail(id: number) {
    try {
      return await this.usersRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
