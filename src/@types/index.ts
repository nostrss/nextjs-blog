export type User = {
  userId: number;
  name: string;
  profileImage: string;
};

export type BlogComments = {
  createdAt: string;
  commentId: number;
  comment: string;
  user: User;
};

export type BlogPost = {
  postId: string;
  title: string;
  contents: string;
  timestamp: string;
};
