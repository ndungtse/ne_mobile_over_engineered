export interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends Timestamps {
  id: string;
  email: string;
  fullName: string;
  password: string;
  orders?: Post[];
  cartId: string;
  username: string;
  verified: boolean;
  verificationToken?: string;
  profilePic?: string;
  posts?: Post[];
}

export interface Post extends Timestamps {
  likes: any;
  id: string;
  title: string;
  content: string;
  image: string;
  authorId: string;
  videoUrl?: string;
  author?: User;
  isMine?: boolean;
  comments?: Comment[];
}

export interface Comment extends Timestamps {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  author?: User;
}
