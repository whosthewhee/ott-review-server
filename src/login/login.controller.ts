import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  private readonly logger = new Logger(LoginController.name);
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.loginService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException(
        '아이디 또는 비밀번호가 올바르지 않습니다.',
      );
    }

    //로그인 성공 시 JWT 토큰 발급
    const token = await this.loginService.login(user);

    return { message: '로그인에 성공했습니다.', ...token };
  }
}
