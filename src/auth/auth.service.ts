import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/interfaces/jwt.payload.interface';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../login/dto/login.dto';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    // @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async jwtLogin(loginDto: LoginDto) {
    const { email, password } = loginDto;
    //validateUser 함수 내용 바로 사용
    // const user = await this.userModel
    //   .findOne({ email, isDeleted: false })
    //   .exec();

    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException({
        message: '가입되지 않은 이메일입니다.',
        error: 'unenteredEmailError',
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException({
        message: '비밀번호가 올바르지 않습니다.',
        error: 'differentPasswordError',
      });
    }

    const payload: JwtPayload = {
      email: user.email,
      userinfo: {
        nickname: user.userinfo.nickname,
        imageUrl: user.userinfo.imageUrl,
      },
      sub: user._id.toString(),
    };

    // return {
    //   token: this.jwtService.sign(payload),
    // };

    const accessToken = this.jwtService.sign(payload);
    return {
      userId: user._id,
      email: user.email,
      userinfo: {
        nickname: user.userinfo.nickname,
        imageUrl: user.userinfo.imageUrl,
      },
      accessToken,
    };
  }
}
