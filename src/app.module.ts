import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'; // ConfigModule모듈 설정 > env 환경변수 가져올때 사용
import { CategoriesModule } from './categories/categories.module';
import { ContentsModule } from './contents/contents.module';
import { PlatformsModule } from './platforms/platforms.module';
import { BannerContentsModule } from './bannerContents/bannerContents.module';
import { UserModule } from './users/users.module';
import { ReviewModule } from './reviews/reviews.module';
// import { LoginModule } from './login/login.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // ConfigModule모듈 설정 > 환경 변수를 사용할 수 있게 설정
    MongooseModule.forRoot(process.env.MONGODB_URI), // MongoDB 연결-환경 변수에서 MongoDB URI를 가져옴
    CategoriesModule, // Categories 모듈 추가
    ContentsModule, // Contents 모듈 추가
    PlatformsModule, // Platforms 모듈 추가
    BannerContentsModule, // BannerContent 모듈 추가
    UserModule, // User 모듈 추가
    ReviewModule, // Review 모듈 추가
    AuthModule, // Login 모듈 추가
  ],
})
export class AppModule {}
