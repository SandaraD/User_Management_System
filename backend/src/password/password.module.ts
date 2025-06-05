import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Password } from './entities/password/password';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Password]), UsersModule],
  providers: [PasswordService],
  controllers: [PasswordController],
  exports: [PasswordService],
})
export class PasswordModule {}
