import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() body: { fistName: string; password: string },
  ): Promise<{ access_token: string }> {
    return this.authService.signIn(body.fistName, body.password);
  }
}
