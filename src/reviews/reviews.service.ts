import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './schemas/review.schema';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) {}

  // 모든 리뷰 가져오기
  async getAllReviews(): Promise<Review[]> {
    return this.reviewModel
      .find()
      .populate([
        {
          path: 'contents',
          select: '_id',
          model: 'Content',
        },
        {
          path: 'users',
          select: 'userInfo',
          model: 'User',
        },
      ])
      .exec();
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
