import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import ms from 'ms';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../jwt-payload.interface';
import { User } from '../user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
    response: Response,
  ): Promise<{ accessToken: string }> {
    const { email, password } = authCredentialsDto;

    const user = await this.userRepository.findOneBy({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };

      const accessToken: string = this.jwtService.sign(payload);

      const refreshToken: string = this.jwtService.sign(payload, {
        expiresIn: '7d',
      });
      const refreshTokenExpiration = new Date();
      refreshTokenExpiration.setMilliseconds(
        refreshTokenExpiration.getMilliseconds() + ms('7d'),
      );

      response.cookie('Authentication', refreshToken, {
        httpOnly: true,
        secure: true,
        expires: refreshTokenExpiration,
      });

      return { accessToken };
    } else {
      throw new UnauthorizedException('Check your login credentials');
    }
  }

  async refresh(user: User): Promise<{ accessToken: string }> {
    const { email } = user;

    const payload: JwtPayload = { email };

    const accessToken: string = this.jwtService.sign(payload);

    return { accessToken };
  }
}
