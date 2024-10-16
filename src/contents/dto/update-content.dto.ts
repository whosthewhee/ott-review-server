import { Platform } from 'src/platforms/schemas/platform.schema';
import { Category } from 'src/categories/schemas/category.schema';

export class UpdateContentDto {
  title: string;
  rating: number;
  imageUrl: string;
  platformName: string;
  categoryName: string;
  typeName: string;
  productionCompany: productionCompany;

  //참조 도큐먼트 (platform, category)
  // platforms: mongoose.Types.ObjectId;
  // categories: mongoose.Types.ObjectId;
  platforms: Platform;
  categories: Category;
}

class productionCompany {
  name: string;
  founded: number;
  country: string;
}
