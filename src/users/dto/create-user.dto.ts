export class CreateUserDto {
  email: string;
  password: string;
  isDeleted: boolean;
  //내장 컬렉션
  userinfo: userInfo;
  userrole: userRole;
}

class userInfo {
  nickname: string;
  imageUrl: string;
  favoriteContents: string[];
}

class userRole {
  roleName: string; // "관리자"||"일반 사용자"
  permission: string; // "admin"||"normal"
}
