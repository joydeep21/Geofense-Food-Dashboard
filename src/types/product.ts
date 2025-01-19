export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  status: 'active' | 'inactive';
  stock: number;
  createdAt: string;
}

export interface ProductFilters {
  search: string;
  category: string;
  status: string;
  sortBy: string;
}