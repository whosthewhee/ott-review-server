import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { JwtPayload } from './interfaces/jwt.payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          let token = null;
          if (request && request.cookies) {
            token = request.cookies['accessToken']; // 쿠키에서 토큰 추출
          }

          this.logger.log(`JWT: ${token}`);
          return token;
        },
      ]),
      secretOrKey: process.env.JWT_SECRET_KEY,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload) {
    this.logger.log(`JWT Payload: ${JSON.stringify(payload)}`); // 페이로드 값을 로그로 출력
    return { userId: payload.sub, email: payload.email };
  }
}
