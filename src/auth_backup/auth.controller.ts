// auth.controller.ts
import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from '../login/dto/login.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.logger.warn('start login');
    const loginResult = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );

    // JWT 토큰을 쿠키에 추가
    res.cookie('access_token', loginResult.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, // 1 hour
    });
    this.logger.warn('cookie added');

    return res.status(HttpStatus.OK).json({
      result: 'success',
      userId: loginResult.userId,
      email: loginResult.email,
      userinfo: {
        nickname: loginResult.userinfo.nickname,
        imageUrl: loginResult.userinfo.imageUrl,
      },
    });
  }
}
