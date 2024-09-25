import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({ required: true })
  category_id: number;

  @Prop({ required: true })
  category_nm: string;

  @Prop({ required: true })
  reg_dt: string;

  @Prop({ required: true })
  chg_dt: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
