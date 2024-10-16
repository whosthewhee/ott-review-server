import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  createdDate: string;

  @Prop({ required: true })
  updatedDate: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
