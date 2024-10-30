import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { User, UserSchema } from '../users/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '12h' }, // 토큰 유효기간 설정
    }),
  ],
  providers: [LoginService],
  controllers: [LoginController],
  exports: [JwtModule],
})
export class LoginModule {}
