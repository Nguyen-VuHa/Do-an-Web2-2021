export interface Category {
  category_id: number;
  category_name: string;
  created_at: string;
  status: string;
}

export interface BodyCreateCategory {
  category_name: string;
}

export interface Director {
  director_id: number;
  director_name: string;
  created_at: string;
  status: string;
}

export interface BodyCreateDirector {
  director_name: string;
}
