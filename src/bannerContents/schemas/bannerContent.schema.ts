import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class BannerContent extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true })
  linkUrl: string;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({ required: true })
  seq: number;

  @Prop({ required: true })
  postedDate: string;
}

export type BannerContentDocument = BannerContent & Document;
export const BannerContentSchema = SchemaFactory.createForClass(BannerContent);
