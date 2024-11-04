import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userModel
      .findOne({ email, isDeleted: false })
      .exec();
    if (!user) {
      //throw new UnauthorizedException('존재하지 않는 사용자입니다.');
      throw new UnauthorizedException({
        message: '가입되지 않은 이메일입니다.',
        error: 'unenteredEmailError',
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      //throw new UnauthorizedException('비밀번호가 올바르지 않습니다.');
      throw new UnauthorizedException({
        message: '비밀번호가 올바르지 않습니다.',
        error: 'differentPasswordError',
      });
    }

    return user;
  }
  // async login(user: User) {
  //   const payload = {
  //     email: user.email,
  //     userinfo: {
  //       nickname: user.userinfo.nickname,
  //       imageUrl: user.userinfo.imageUrl,
  //     },
  //     // nickname: user.userinfo.nickname,
  //     // userImageUrl: user.userinfo.imageUrl,
  //     sub: user._id,
  //   };

  //   return {
  //     accessToken: this.jwtService.sign(payload),
  //   };
  // }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    // JWT 토큰 옵션 설정 (서비스 또는 컨트롤러에서 직접 설정)
    const jwtOptions: JwtSignOptions = {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    };

    const payload = {
      email: user.email,
      userinfo: {
        nickname: user.userinfo.nickname,
        imageUrl: user.userinfo.imageUrl,
      },
      sub: user._id,
    };

    // const token = this.jwtService.sign(payload);
    const accessToken = this.jwtService.sign(payload, jwtOptions);

    return {
      userId: user._id,
      email: user.email,
      userinfo: {
        nickname: user.userinfo.nickname,
        imageUrl: user.userinfo.imageUrl,
      },
      accessToken,
    };

    // const expiresIn = this.configService.get<number>('JWT_EXPIRES_IN', 12) * 3600;
    // const accessToken = this.jwtService.sign(payload, {
    //   expiresIn,
    //   secret: this.configService.get<string>('JWT_SECRET'),
    // });

    // return {
    //   accessToken,
    //   memberId: member.id,
    //   email: member.email,
    //   name: member.userName ?? member.nickName,
    //   roles: payload.roles,
    //   expiresAt: new Date(Date.now() + expiresIn * 1000).toISOString(),
    // };
  }
}
