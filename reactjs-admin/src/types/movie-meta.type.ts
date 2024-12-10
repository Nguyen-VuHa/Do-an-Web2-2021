export interface Category {
  category_id: number;
  category_name: string;
  created_at: string;
  status: string;
}

export interface BodyCreateCategory {
  category_name: string,
}