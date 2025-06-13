import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request as ExpressRequest } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { JwtPayload } from './types';
import { PasswordService } from 'src/password/password.service';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: { fistName: string; password: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token } = await this.authService.signIn(
      body.fistName,
      body.password,
    );

    response.cookie('jwt', access_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return { message: 'Login successful' };
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Request() req: ExpressRequest & { user: JwtPayload }) {
    return req.user;
  }

  @Post('signup')
  async signUp(
    @Body()
    body: {
      firstName: string;
      lastName: string;
      birthYear: number;
      password: string;
    },
  ) {
    const user = await this.usersService.create({
      firstName: body.firstName,
      lastName: body.lastName,
      birthYear: body.birthYear,
    });

    await this.passwordService.create(user.id, body.password);

    return { message: 'User created successfully', userId: user.id };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
    return { message: 'Logged out' };
  }
}
