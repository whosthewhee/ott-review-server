import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Platform extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({ required: true })
  createdDate: string;

  @Prop({ required: true })
  updatedDate: string;

  @Prop({ required: true })
  logoImage: string;
}

export type PlatformDocument = Platform & Document;
export const PlatformSchema = SchemaFactory.createForClass(Platform);
