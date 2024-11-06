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
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';

@Controller('login')
export class LoginController {
  private readonly logger = new Logger(LoginController.name);
  constructor(private readonly loginService: LoginService) {}

  @Post()
  // @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.logger.warn('start login');
    const loginResult = await this.loginService.login(
      loginDto.email,
      loginDto.password,
    );

    // JWT를 쿠키에 추가 (보안과 관련된 설정 포함)
    res.cookie('access_token', loginResult.accessToken, {
      httpOnly: true, // 클라이언트 스크립트에서 쿠키 접근 불가
      secure: true, // HTTPS에서만 전송
      //secure: process.env.NODE_ENV === 'production', // HTTPS에서만 전송 (배포 환경에서 설정)
      maxAge: 3600000, // 1시간
    });
    this.logger.warn('cookie added');

    // 응답 전송
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
