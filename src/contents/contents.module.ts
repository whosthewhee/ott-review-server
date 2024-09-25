import { Module } from '@nestjs/common';
import { ContentsController } from './contents.controller';
import { ContentsService } from './contents.service';
import { Content, ContentSchema } from './schemas/content.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Content.name, schema: ContentSchema }]),
  ],
  controllers: [ContentsController],
  providers: [ContentsService],
})
export class ContentsModule {}
