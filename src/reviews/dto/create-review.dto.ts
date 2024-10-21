import { Content } from 'src/contents/schemas/content.schema';
import { User } from 'src/users/schemas/user.schema';

export class CreateReviewDto {
  rating: number;
  content: string;
  seq: number;
  createdDate: string;
  updatedDate: string;
  isDeleted: boolean;

  //참조 도큐먼트 (contents, users)
  contents: Content;
  users: User;
}
