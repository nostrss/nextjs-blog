export type LoginUser = {
  userId: number;
  name: string;
  displayName: string;
  photoURL: string;
  screenName: string;
};

export type BlogComments = {
  createdAt: string;
  commentId: number;
  comment: string;
  user: LoginUser;
};

export type BlogPost = {
  postId: string;
  title: string;
  contents: string;
  timestamp: string;
};
