export class CreateUserDto {
  email: string;
  password: string;
  isDeleted: boolean;
  //내장 도큐먼트
  userinfo: userInfo;
}

class userInfo {
  nickname: string;
  imageUrl: string;
  favoriteContents: string[];
}
