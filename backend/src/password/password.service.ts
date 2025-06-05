import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Password } from './entities/password/password';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PasswordService {
  constructor(
    @InjectRepository(Password)
    private passwordRepository: Repository<Password>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userId: number, plainPassword: string): Promise<Password> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new Error('User not foudn');

    const hash = await bcrypt.hash(plainPassword, 10);

    const password = this.passwordRepository.create({
      hash,
      user,
    });

    return this.passwordRepository.save(password);
  }

  async validate(userId: number, inputPassword: string): Promise<boolean> {
    const record = await this.passwordRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!record) return false;

    return bcrypt.compare(inputPassword, record.hash);
  }
}
