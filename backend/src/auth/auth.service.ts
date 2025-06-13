import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from 'src/password/password.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    firstName: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findByFirstName(firstName);
    if (!user) throw new UnauthorizedException('User not found');

    const isValid = await this.passwordService.validate(user.id, password);
    if (!isValid) throw new UnauthorizedException('Invalid password');

    const payload = { sub: user.id, firstName: user.firstName };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token }; // ✅ This must be an object!
  }
}
