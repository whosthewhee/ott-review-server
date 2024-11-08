// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from '../users/schemas/user.schema';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret', // JWT 서명에 사용되는 비밀 키
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h', // 토큰 유효 기간
      },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // User 모델 등록
  ],
  controllers: [AuthController], // AuthController를 모듈에 추가
  providers: [AuthService, LocalStrategy, JwtStrategy], // AuthService, LocalStrategy, JwtStrategy를 주입
  exports: [AuthService], // 다른 모듈에서 AuthService를 사용 가능하게 export
})
export class AuthModule {}
