export interface JwtPayload {
  email: string;
  userinfo: {
    nickname: string;
    imageUrl: string;
  };
  sub: string; //user._id
}
