import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { AuthService } from '../auth/auth.service';

@Controller('login')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  // @Res사용하지 않고 token을 return하는 버전
  @Post()
  async login_with_token(@Body() loginDto: LoginDto) {
    const loginResult = await this.authService.jwtLogin(loginDto);

    return {
      result: 'success',
      userId: loginResult.userId,
      email: loginResult.email,
      userinfo: {
        nickname: loginResult.userinfo.nickname,
        imageUrl: loginResult.userinfo.imageUrl,
      },
      token: loginResult.accessToken,
    };
  }

  // @Res에 cookie 설정해서 return하는 버전
  @Post()
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const loginResult = await this.authService.jwtLogin(loginDto);

    // JWT를 쿠키에 추가 (보안과 관련된 설정 포함)
    res.cookie('accessToken', loginResult.accessToken, {
      httpOnly: true, // 클라이언트 스크립트에서 쿠키 접근 불가
      secure: false, // HTTPS에서만 전송 (개발 환경에서는 false로 설정)
      maxAge: 3600000, // 1시간
    });

    return {
      result: 'success',
      userId: loginResult.userId,
      email: loginResult.email,
      userinfo: {
        nickname: loginResult.userinfo.nickname,
        imageUrl: loginResult.userinfo.imageUrl,
      },
      //token: loginResult.accessToken,
    };
  }
}
