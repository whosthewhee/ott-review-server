import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContentDocument = Content & Document;

@Schema()
export class Content {
  // @Prop({ required: true })
  // content_id: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  imageUrl: string;

  /*일단 만들고 나중에 외래키/테이블로 분리하기 */
  @Prop({ required: true })
  platform_nm: string;

  // @Prop({ required: true })
  // platform_id: number;

  @Prop({ required: true })
  category_nm: string;

  @Prop({ required: true })
  type_nm: string;

  // @Prop({ required: true })
  // category_id: number;
}

export const ContentSchema = SchemaFactory.createForClass(Content);
