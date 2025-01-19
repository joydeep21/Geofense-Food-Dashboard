export type UserRole = 'admin' | 'seller';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
}

export interface UserFilters {
  search: string;
  role: string;
  status: string;
  sortBy: string;
}