import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  //  POST
  async create(userData: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(userData);
    return await this.userRepository.save(newUser);
  }

  // GET all users
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // GET user by ID
  async findOne(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  // PUT user by ID
  async update(id: number, userData: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    const updatedUser = this.userRepository.merge(user as User, userData);
    return await this.userRepository.save(updatedUser);
  }
  // DELETE user by ID
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
  async findByFirstName(firstName: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { firstName } });
  }
}
