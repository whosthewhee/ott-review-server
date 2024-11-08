import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Content } from 'src/contents/schemas/content.schema';
import { User } from 'src/users/schemas/user.schema';

@Schema()
export class Review {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  seq: number;

  @Prop({ required: true })
  createdDate: string;

  @Prop({ required: true })
  updatedDate: string;

  @Prop({ default: false })
  isDeleted: boolean;

  //참조 도큐먼트 (contents, users)
  @Prop({ type: mongoose.Types.ObjectId, ref: 'contents', required: true })
  contents: Content;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'users', required: true })
  users: User;
}

export type ReviewDocument = Review & Document;
export const ReviewSchema = SchemaFactory.createForClass(Review);
