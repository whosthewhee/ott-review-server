import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // 모든 유저 가져오기
  async getAllUsers(): Promise<User[]> {
    return this.userModel.find({ isDeleted: false }).exec();
  }

  // 특정 유저 가져오기
  async getUserById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  // 비밀번호 암호화
  async hashPassword(password: string): Promise<string> {
    // 첫 번째 인수 : 암호화할 비밀번호
    // 두 번째 인수 : 암호화에 사용될 salt값, 값이 클수록 보안성이 높아지지만 암호화 시간이 길어진다.
    return bcrypt.hash(password, 11);
  }

  // 동일한 이메일 검사
  async checkDuplicateEmail(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email }).exec();
    // const user = await this.userModel.findOne({
    //   where: { email },
    //   withDeleted: true, //DB에서 삭제된 정보를 포함해서 조회할 때 사용
    // });
    // if (user) {
    //   throw new BadRequestException('이미 사용중인 이메일입니다.');
    // }
    return !user; // 유저가 없으면 true, 있으면 false 반환
  }

  // 유저 생성
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  // 유저 업데이트
  async updateUser(
    id: string,
    updateData: Partial<CreateUserDto>,
  ): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  // 유저 삭제
  async deleteUser(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
