import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BannerContentsService } from './bannerContents.service';
import { BannerContentsController } from './bannerContents.controller';
import {
  BannerContent,
  BannerContentSchema,
} from './schemas/bannerContent.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BannerContent.name, schema: BannerContentSchema },
    ]),
  ],
  controllers: [BannerContentsController],
  providers: [BannerContentsService],
})
export class BannerContentsModule {}
