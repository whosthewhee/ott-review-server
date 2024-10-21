import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BannerContent } from './schemas/bannerContent.schema';
import { CreateBannerContentDto } from './dto/createBannerContent.dto';

@Injectable()
export class BannerContentsService {
  constructor(
    @InjectModel(BannerContent.name)
    private bannerContentModel: Model<BannerContent>,
  ) {}

  // 배너 컨텐츠 가져오기(isAcitve가 true인 것만)
  async getAllBannerContents(): Promise<BannerContent[]> {
    return this.bannerContentModel.find({ isActive: true }).exec();
  }

  // 특정 배너 컨텐츠 가져오기
  async getBannerContentById(id: string): Promise<BannerContent> {
    return this.bannerContentModel.findById(id).exec();
  }

  // 배너 컨텐츠 생성
  async createBannerContent(
    createBannerContentDto: CreateBannerContentDto,
  ): Promise<BannerContent> {
    const createdBanner = new this.bannerContentModel(createBannerContentDto);
    return createdBanner.save();
  }

  // 배너 컨텐츠 업데이트
  async updateBannerContent(
    id: string,
    updateData: Partial<CreateBannerContentDto>,
  ): Promise<BannerContent> {
    return this.bannerContentModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  // 배너 컨텐츠 삭제
  async deleteBannerContent(id: string): Promise<BannerContent> {
    return this.bannerContentModel.findByIdAndDelete(id).exec();
  }
}
