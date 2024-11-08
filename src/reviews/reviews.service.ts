import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './schemas/review.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { ResultReviewDto } from './dto/result-review.dto';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) {}

  // 모든 리뷰 가져오기
  async getAllReviews(): Promise<ResultReviewDto[]> {
    try {
      const reviews = await this.reviewModel.find().populate([
        {
          path: 'contents', // 참조할 도큐먼트
          model: 'Content',
        },
        {
          path: 'users',
          select: 'userinfo',
          model: 'User',
        },
      ]);

      if (this.reviewModel.length === 0) {
        return null;
      }

      const data: ResultReviewDto[] = reviews.map((review: Review) => {
        return {
          _id: review._id,
          content: review.content,
          rating: review.rating,
          seq: review.seq,
          createdDate: review.createdDate,
          updatedDate: review.updatedDate,
          contents: review.contents, // 참조 도큐먼트
          users: {
            userinfo: {
              nickname: review.users.userinfo.nickname,
              imageUrl: review.users.userinfo.imageUrl,
            },
          },
        };
      });

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // 특정 리뷰 가져오기
  async getReviewById(id: string): Promise<Review> {
    return this.reviewModel
      .findById(id)
      .populate('contents')
      .populate('users')
      .exec();
  }

  // 리뷰 생성
  async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
    const createdReview = new this.reviewModel(createReviewDto);
    return createdReview.save();
  }

  // 리뷰 업데이트
  async updateReview(
    id: string,
    updateData: Partial<CreateReviewDto>,
  ): Promise<Review> {
    return this.reviewModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  // 리뷰 삭제
  async deleteReview(id: string): Promise<Review> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }
}
