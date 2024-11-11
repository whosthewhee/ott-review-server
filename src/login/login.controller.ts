import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from '../auth/auth.service';

@Controller('login')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() loginDto: LoginDto) {
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
}
