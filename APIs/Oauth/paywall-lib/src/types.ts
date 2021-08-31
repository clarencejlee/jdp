type ProductType = 'once' | 'monthly' | 'yearly';

export interface Product {
  client: string;
  name: string;
  price: number;
  type: ProductType;
}
