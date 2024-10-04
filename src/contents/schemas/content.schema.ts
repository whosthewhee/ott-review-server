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

  // @Prop({ required: true })
  // platform_id: number;
}

export const ContentSchema = SchemaFactory.createForClass(Content);
