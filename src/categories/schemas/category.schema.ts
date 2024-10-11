import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  // @Prop({ required: true })
  // category_id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  regDate: string;

  @Prop({ required: true })
  chgDate: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
