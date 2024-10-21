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

  // 모든 컨텐츠 가져오기 =>  참조 도큐먼트 (platform, category)를 가져오기 위해 populate 사용
  async getAllContents(): Promise<Content[]> {
    try {
      const contents = await this.contentModel.find().populate([
        {
          path: 'platform',
          select: ['name', 'isActive'],
          model: 'Platform',
        },
        {
          path: 'category',
          select: 'name',
          model: 'Category',
        },
      ]);

      if (this.contentModel.length === 0) {
        return null;
      }

      const data = contents.map((content: Content) => {
        return {
          _id: content._id,
          title: content.title,
          rating: content.rating,
          imageUrl: content.imageUrl,
          platformName: content.platformName,
          categoryName: content.categoryName,
          typeName: content.typeName,
          productionCompany: content.productionCompany,
          platform: content.platform,
          category: content.category,
        };
      });

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // 특정 컨텐츠 가져오기
  async getContentById(id: string): Promise<Content> {
    return this.contentModel.findById(id).exec();
  }

  // 새로운 컨텐츠 생성
  async createContent(createContentDto: CreateContentDto): Promise<Content> {
    const newContent = new this.contentModel(createContentDto);
    return newContent.save();
  }

  // 컨텐츠 업데이트
  // async updateContent(
  //   id: string,
  //   updateContentDto: CreateContentDto,
  // ): Promise<Content> {
  //   const updatedContent = await this.contentModel
  //     .findByIdAndUpdate(id, updateContentDto, { new: true })
  //     .exec();

  //   if (!updatedContent) {
  //     throw new NotFoundException(`Content with id ${id} not found`);
  //   }
  //   return updatedContent;
  // }

  // 컨텐츠 업데이트 > 참조 도큐먼트(platform, category) 추가
  async updateContent(
    id: string,
    updateContentDto: CreateContentDto,
  ): Promise<Content> {
    try {
      const updatedContent = await this.contentModel
        .findByIdAndUpdate(id, updateContentDto, { new: true })
        .populate([
          {
            path: 'platform',
            select: 'name',
            //model: 'User'
          },
          {
            path: 'category',
            select: 'name',
            //model: 'Meal'
          },
        ])
        .exec();

      if (!updatedContent) {
        throw new NotFoundException(`Content with id ${id} not found`);
      }

      const data: Content = {
        _id: updatedContent._id,
        title: updatedContent.title,
        rating: updatedContent.rating,
        imageUrl: updatedContent.imageUrl,
        platformName: updatedContent.platformName,
        categoryName: updatedContent.categoryName,
        typeName: updatedContent.typeName,
        productionCompany: updatedContent.productionCompany,
        platform: updatedContent.platform,
        category: updatedContent.category,
      };

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // 컨텐츠 삭제
  async deleteContent(id: string): Promise<void> {
    const result = await this.contentModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Content with id ${id} not found`);
    }
  }
}
