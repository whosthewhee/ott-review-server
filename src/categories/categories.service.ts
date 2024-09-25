import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  // 모든 카테고리 가져오기
  async getAllCategories(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  // 특정 카테고리 가져오기
  async getCategoryById(id: string): Promise<Category> {
    return this.categoryModel.findById(id).exec();
  }

  // 새로운 카테고리 생성
  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const newCategory = new this.categoryModel(createCategoryDto);
    return newCategory.save();
  }

  // 카테고리 업데이트
  async updateCategory(
    id: string,
    updateCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const updatedCategory = await this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .exec();

    if (!updatedCategory) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return updatedCategory;
  }

  // 카테고리 삭제
  async deleteCategory(id: string): Promise<void> {
    const result = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
  }
}
