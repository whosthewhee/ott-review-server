import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { ResultContentDto } from './dto/result-content.dto';
import { Content } from './schemas/content.schema';

@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Get()
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
