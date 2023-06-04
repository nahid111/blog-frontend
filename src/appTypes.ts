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

export type { Post, Category };
