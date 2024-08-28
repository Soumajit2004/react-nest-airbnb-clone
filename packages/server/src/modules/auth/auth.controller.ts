import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { Response } from 'express';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto, response);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('/refresh')
  refresh(@GetUser() user: User): Promise<{ accessToken: string }> {
    return this.authService.refresh(user);
  }
}
