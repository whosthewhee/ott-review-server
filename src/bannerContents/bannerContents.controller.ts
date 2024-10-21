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
  findAll() {
    return this.bannerContentService.findAll();
  }

  // 특정 배너 컨텐츠 가져오기
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bannerContentService.findOne(id);
  }

  // 배너 컨텐츠 생성
  @Post()
  create(@Body() createBannerContentDto: CreateBannerContentDto) {
    return this.bannerContentService.create(createBannerContentDto);
  }

  // 배너 컨텐츠 업데이트
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateBannerContentDto>,
  ) {
    return this.bannerContentService.update(id, updateData);
  }

  // 배너 컨텐츠 삭제
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.bannerContentService.delete(id);
  }
}
