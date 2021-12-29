export interface Product {
  $key?: string;
  id?: number;
  category?: string;
  description?: string;
  image: string;
  price: number;
  title: string;
  total?: number;
}
