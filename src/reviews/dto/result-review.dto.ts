import { Content } from 'src/contents/schemas/content.schema';

export class ResultReviewDto {
  _id: string;
  content: string;
  rating: number;
  seq: number;
  createdDate: string;
  updatedDate: string;
  contents: Content; // 참조 도큐먼트
  users: {
    userinfo: {
      nickname: string;
      imageUrl: string;
    };
  };
}
