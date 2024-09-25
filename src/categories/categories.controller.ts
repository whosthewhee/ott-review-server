import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './schemas/category.schema';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return this.categoriesService.getAllCategories();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.getCategoryById(id);
  }

  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.updateCategory(id, createCategoryDto);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<void> {
    return this.categoriesService.deleteCategory(id);
  }
}
