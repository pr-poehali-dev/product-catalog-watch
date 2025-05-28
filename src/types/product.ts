export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  inStock: boolean;
}

export interface Category {
  id: number;
  name: string;
  count: number;
}

export interface User {
  isAdmin: boolean;
  username: string;
}
