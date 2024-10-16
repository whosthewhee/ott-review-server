import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PlatformsService } from './platforms.service';
import { CreatePlatformDto } from './dto/create-platform.dto';
import { Platform } from './schemas/platform.schema';

@Controller('platforms')
export class PlatformsController {
  constructor(private readonly platformsService: PlatformsService) {}

  @Get()
  async getAllPlatforms(): Promise<Platform[]> {
    return this.platformsService.getAllPlatforms();
  }

  @Get(':id')
  async getPlatformById(@Param('id') id: string): Promise<Platform> {
    return this.platformsService.getPlatformById(id);
  }

  @Post()
  async createPlatform(
    @Body() createPlatformDto: CreatePlatformDto,
  ): Promise<Platform> {
    return this.platformsService.createPlatform(createPlatformDto);
  }

  @Put(':id')
  async updatePlatform(
    @Param('id') id: string,
    @Body() updatePlatformDto: CreatePlatformDto,
  ): Promise<Platform> {
    return this.platformsService.updatePlatform(id, updatePlatformDto);
  }

  @Delete(':id')
  async deletePlatform(@Param('id') id: string): Promise<void> {
    return this.platformsService.deletePlatform(id);
  }
}
