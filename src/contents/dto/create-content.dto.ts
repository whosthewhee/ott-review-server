import { Platform } from 'src/platforms/schemas/platform.schema';
import { Category } from 'src/categories/schemas/category.schema';

export class CreateContentDto {
  title: string;
  rating: number;
  imageUrl: string;
  platformName: string;
  categoryName: string;
  typeName: string;
  //내장 도큐먼트
  productionCompany: productionCompany;
  //참조 도큐먼트 (platform, category)
  platform: Platform;
  category: Category;
}

class productionCompany {
  name: string;
  founded: number;
  country: string;
}
