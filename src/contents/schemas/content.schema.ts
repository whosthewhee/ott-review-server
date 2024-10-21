import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, mongo } from 'mongoose';
import { Category } from 'src/categories/schemas/category.schema';
import { Platform } from 'src/platforms/schemas/platform.schema';

class ProductionCompany {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  founded: number;

  @Prop({ required: true })
  country: string;
}

@Schema()
export class Content {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true })
  platformName: string;

  @Prop({ required: true })
  categoryName: string;

  @Prop({ required: true })
  typeName: string;

  @Prop({ type: ProductionCompany, required: true })
  productionCompany: ProductionCompany;

  //참조 도큐먼트 (platform, category)
  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'platforms' }] })
  platform: Platform;

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'categories' }] })
  category: Category;
}

export type ContentDocument = Content & Document;
export const ContentSchema = SchemaFactory.createForClass(Content);
