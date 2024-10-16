import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlatformDto } from './dto/create-platform.dto';
import { UpdatePlatformDto } from './dto/update-platform.dto';
import { Platform, PlatformDocument } from './schemas/platform.schema';

@Injectable()
export class PlatformsService {
  constructor(
    @InjectModel(Platform.name) private platformModel: Model<PlatformDocument>,
  ) {}

  // 모든 플랫폼 가져오기
  async getAllPlatforms(): Promise<Platform[]> {
    return this.platformModel.find().exec();
  }

  // 특정 플랫폼 가져오기
  async getPlatformById(id: string): Promise<Platform> {
    return this.platformModel.findById(id).exec();
  }

  // 새로운 플랫폼 생성
  async createPlatform(
    createPlatformDto: CreatePlatformDto,
  ): Promise<Platform> {
    const newContent = new this.platformModel(createPlatformDto);
    return newContent.save();
  }

  // 플랫폼 업데이트
  async updatePlatform(
    id: string,
    updatePlatformDto: CreatePlatformDto,
  ): Promise<Platform> {
    const updatedPlatform = await this.platformModel
      .findByIdAndUpdate(id, updatePlatformDto, { new: true })
      .exec();

    if (!updatedPlatform) {
      throw new NotFoundException(`Content with id ${id} not found`);
    }
    return updatedPlatform;
  }

  // 플랫폼 삭제
  async deletePlatform(id: string): Promise<void> {
    const result = await this.platformModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Content with id ${id} not found`);
    }
  }
}
