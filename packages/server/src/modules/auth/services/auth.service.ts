import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../jwt-payload.interface';
import { User } from '../user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = authCredentialsDto;

    const user = await this.userRepository.findOneBy({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };

      const accessToken: string = this.jwtService.sign(payload);
      const refreshToken: string = this.jwtService.sign(payload, {
        expiresIn: '7d',
      });

      return { accessToken, refreshToken };
    } else {
      throw new UnauthorizedException('Check your login credentials');
    }
  }

  async refreshToken(user: User): Promise<{ accessToken: string }> {
    const { email } = user;

    const payload: JwtPayload = { email };

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
