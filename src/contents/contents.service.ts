import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content, ContentDocument } from './schemas/content.schema';
import { CreateContentDto } from './dto/create-content.dto';

@Injectable()
export class ContentsService {
  constructor(
    @InjectModel(Content.name) private contentModel: Model<ContentDocument>,
  ) {}

  // 모든 카테고리 가져오기
  async getAllContents(): Promise<Content[]> {
    return this.contentModel.find().exec();
  }

  // 특정 카테고리 가져오기
  async getContentById(id: string): Promise<Content> {
    return this.contentModel.findById(id).exec();
  }

  // 새로운 카테고리 생성
  async createContent(createContentDto: CreateContentDto): Promise<Content> {
    const newContent = new this.contentModel(createContentDto);
    return newContent.save();
  }

  // 카테고리 업데이트
  async updateContent(
    id: string,
    updateContentDto: CreateContentDto,
  ): Promise<Content> {
    const updatedContent = await this.contentModel
      .findByIdAndUpdate(id, updateContentDto, { new: true })
      .exec();

    if (!updatedContent) {
      throw new NotFoundException(`Content with id ${id} not found`);
    }
    return updatedContent;
  }

  // 카테고리 삭제
  async deleteContent(id: string): Promise<void> {
    const result = await this.contentModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Content with id ${id} not found`);
    }
  }
}
