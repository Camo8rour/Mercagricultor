export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  seller: string;
  description?: string;
  availableKilos: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Category = 'Todos' | 'Frutas' | 'Verduras' | 'Tubérculos';

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'debit_card' | 'bank_transfer';
  last4?: string;
  brand?: string;
}