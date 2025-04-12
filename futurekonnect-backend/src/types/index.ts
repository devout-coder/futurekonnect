export interface User {
  id: string;
  email: string;
  username: string;
  imageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface Context {
  userId?: string;
}

export interface SignupInput {
  email: string;
  password: string;
  username: string;
  imageUrl?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ResetPasswordInput {
  token: string;
  newPassword: string;
} 