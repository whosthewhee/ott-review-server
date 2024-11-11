import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginService {
  // constructor(
  //   @InjectModel(User.name) private userModel: Model<UserDocument>,
  //   private readonly jwtService: JwtService,
  // ) {}
  // async validateUser(email: string, password: string): Promise<User | null> {
  //   const user = await this.userModel
  //     .findOne({ email, isDeleted: false })
  //     .exec();
  //   if (!user) {
  //     throw new UnauthorizedException({
  //       message: '가입되지 않은 이메일입니다.',
  //       error: 'unenteredEmailError',
  //     });
  //   }
  //   const isPasswordMatch = await bcrypt.compare(password, user.password);
  //   if (!isPasswordMatch) {
  //     throw new UnauthorizedException({
  //       message: '비밀번호가 올바르지 않습니다.',
  //       error: 'differentPasswordError',
  //     });
  //   }
  //   return user;
  // }
  // async login(email: string, password: string) {
  //   const user = await this.validateUser(email, password);
  //   // JWT 토큰 옵션 설정
  //   const jwtOptions: JwtSignOptions = {
  //     secret: process.env.JWT_SECRET_KEY,
  //     expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  //   };
  //   const payload = {
  //     email: user.email,
  //     userinfo: {
  //       nickname: user.userinfo.nickname,
  //       imageUrl: user.userinfo.imageUrl,
  //     },
  //     sub: user._id,
  //   };
  //   const accessToken = this.jwtService.sign(payload, jwtOptions);
  //   return {
  //     userId: user._id,
  //     email: user.email,
  //     userinfo: {
  //       nickname: user.userinfo.nickname,
  //       imageUrl: user.userinfo.imageUrl,
  //     },
  //     accessToken,
  //   };
  // }
}
