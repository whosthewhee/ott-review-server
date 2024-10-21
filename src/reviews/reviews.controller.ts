import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ReviewService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // 모든 리뷰 가져오기
  @Get()
  getAllReviews() {
    return this.reviewService.getAllReviews();
  }

  // 특정 리뷰 가져오기
  @Get(':id')
  getReviewById(@Param('id') id: string) {
    return this.reviewService.getReviewById(id);
  }

  // 리뷰 생성
  @Post()
  createReview(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.createReview(createReviewDto);
  }

  // 리뷰 업데이트
  @Put(':id')
  updateReview(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateReviewDto>,
  ) {
    return this.reviewService.updateReview(id, updateData);
  }

  // 리뷰 삭제
  @Delete(':id')
  deleteReview(@Param('id') id: string) {
    return this.reviewService.deleteReview(id);
  }
}
