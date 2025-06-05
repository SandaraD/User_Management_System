import { Body, Controller, Post } from '@nestjs/common';
import { PasswordService } from './password.service';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post()
  async create(@Body() body: { userId: number; password: string }) {
    return this.passwordService.create(body.userId, body.password);
  }
}
