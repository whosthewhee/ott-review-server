import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { User, UserSchema } from '../users/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';

@Module({
  // imports: [
  //   MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  //   JwtModule.register({
  //     secret: 'your_secret_key',
  //     signOptions: { expiresIn: '12h' }, // 토큰 유효기간 설정
  //   }),
  // ],
  imports: [AuthModule], // AuthModule 추가
  providers: [LoginService],
  controllers: [LoginController],
  // exports: [JwtModule],
})
export class LoginModule {}
