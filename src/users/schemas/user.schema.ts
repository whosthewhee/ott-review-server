import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
class UserInfo {
  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ type: [String], default: [] })
  favoriteContents: string[];
}

export const UserInfoSchema = SchemaFactory.createForClass(UserInfo);

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: UserInfoSchema, required: true })
  userinfo: UserInfo;
}

//UserDocument를 선언해서 사용하면 TypeScript가 Content 문서의 필드와 Mongoose 문서의 메서드 및 속성을 올바르게 인식할 수 있어 코드의 타입 안정성을 보장 가능
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
