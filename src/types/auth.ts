export type UserRole = 'admin' | 'seller';

export interface User {
  role: UserRole;
  id:string
}

// const myObject: Record<string, any> = {
//   someKey: 42,
//   anotherKey: "hello",
//   yetAnotherKey: true
// };
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}