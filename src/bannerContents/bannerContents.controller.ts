import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { BannerContentsService } from './bannerContents.service';
import { CreateBannerContentDto } from './dto/createBannerContent.dto';

@Controller('bannerContents')
export class BannerContentsController {
  constructor(private readonly bannerContentService: BannerContentsService) {}

  // 모든 배너 컨텐츠 가져오기
  @Get()
  getAllBannerContents() {
    return this.bannerContentService.getAllBannerContents();
  }

  // 특정 배너 컨텐츠 가져오기
  @Get(':id')
  getBannerContentById(@Param('id') id: string) {
    return this.bannerContentService.getBannerContentById(id);
  }

  // 배너 컨텐츠 생성
  @Post()
  createBannerContent(@Body() createBannerContentDto: CreateBannerContentDto) {
    return this.bannerContentService.createBannerContent(
      createBannerContentDto,
    );
  }

  // 배너 컨텐츠 업데이트
  @Put(':id')
  updateBannerContent(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateBannerContentDto>,
  ) {
    return this.bannerContentService.updateBannerContent(id, updateData);
  }

  // 배너 컨텐츠 삭제
  @Delete(':id')
  deleteBannerContent(@Param('id') id: string) {
    return this.bannerContentService.deleteBannerContent(id);
  }
}
