import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 모든 유저 가져오기
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // 특정 유저 가져오기
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  // 유저 생성
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // 유저 업데이트
  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<CreateUserDto>) {
    return this.userService.update(id, updateData);
  }

  // 유저 삭제
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
