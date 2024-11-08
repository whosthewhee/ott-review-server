import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { ResultContentDto } from './dto/result-content.dto';
import { Content } from './schemas/content.schema';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';

@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Get()
  @UseGuards(JwtAuthGuard) // 이 메서드에만 인증 적용
  async getAllContents(): Promise<ResultContentDto[]> {
    return this.contentsService.getAllContents();
  }

  @Get(':id')
  async getContentById(@Param('id') id: string): Promise<Content> {
    return this.contentsService.getContentById(id);
  }

  @Post()
  async createContent(
    @Body() createContentDto: CreateContentDto,
  ): Promise<Content> {
    return this.contentsService.createContent(createContentDto);
  }

  @Put(':id')
  async updateContent(
    @Param('id') id: string,
    @Body() createContentDto: CreateContentDto,
  ): Promise<Content> {
    return this.contentsService.updateContent(id, createContentDto);
  }

  @Delete(':id')
  async deleteContent(@Param('id') id: string): Promise<void> {
    return this.contentsService.deleteContent(id);
  }
}
