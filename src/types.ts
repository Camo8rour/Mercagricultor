export type Category = 'Todos' | 'Frutas' | 'Verduras' | 'Tubérculos';

export type UserRole = 'buyer' | 'seller' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: Category;
  seller: string;
  description?: string;
  availableKilos: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  seller: string;
  quantity: number;
}
