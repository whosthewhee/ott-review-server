export class ResultContentDto {
  _id: string;
  title: string;
  rating: number;
  imageUrl: string;
  platformName: string;
  categoryName: string;
  typeName: string;
  productionCompany: productionCompany; //내장 도큐먼트
}

class productionCompany {
  name: string;
  founded: number;
  country: string;
}
