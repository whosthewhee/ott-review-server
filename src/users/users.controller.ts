import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  // 모든 유저 가져오기
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  // 특정 유저 가져오기
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  // 유저 생성
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    // await this.userService.checkDuplicateEmail(createUserDto.email);
    const isEmailAvailable = await this.userService.checkDuplicateEmail(
      createUserDto.email,
    );
    if (!isEmailAvailable) {
      this.logger.warn('Email already in use');
      throw new BadRequestException({
        message: '이미 사용중인 이메일입니다.',
        error: 'duplicatedEmailError',
      });
    }

    const hashedPassword = await this.userService.hashPassword(
      createUserDto.password,
    );
    this.logger.debug('Password hashed successfully');
    //암호화된 password로 변경
    createUserDto.password = hashedPassword;

    // 유저 생성 및 저장
    const createdUser = await this.userService.createUser(createUserDto);
    this.logger.debug('User created successfully');

    return createdUser;
    //return await this.userService.createUser(createUserDto);
  }

  // 유저 업데이트
  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateUserDto>,
  ) {
    return this.userService.updateUser(id, updateData);
  }

  // 유저 삭제
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
