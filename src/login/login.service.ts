import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
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
  async login(user: User) {
    const payload = {
      email: user.email,
      nickname: user.userinfo.nickname,
      userImageUrl: user.userinfo.imageUrl,
      sub: user._id,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
