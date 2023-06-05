type User = {
  id: number;
  last_login: string | null;
  email: string;
  name: string | null;
  avatar: string | null;
  created_at: string;
  is_active: boolean;
  is_admin: boolean;
  is_staff: boolean;
  is_superuser: boolean;
};

type Post = {
  id: number;
  author: string;
  categories: string[];
  title: string;
  body: string;
  cover_img_url: string;
  created_at: string;
  updated_at: string;
};

type Category = {
  id: number;
  title: string;
  created_at: string;
  posts: number[];
};

type Comment = {
  id: number;
  body: string;
  created_at: string;
  author: number;
  post: number;
};

export type { User, Post, Category, Comment };
