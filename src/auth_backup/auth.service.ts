// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userModel
      .findOne({ email, isDeleted: false })
      .exec();
    if (!user) {
      throw new UnauthorizedException('가입되지 않은 이메일입니다.');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('비밀번호가 올바르지 않습니다.');
    }

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    const payload: JwtPayload = {
      email: user.email,
      userinfo: {
        nickname: user.userinfo.nickname,
        imageUrl: user.userinfo.imageUrl,
      },
      sub: user._id.toString(),
    };

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
