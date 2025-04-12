export interface User {
  id: string;
  email: string;
  username: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PasswordResetToken {
  id: string;
  user_id: string;
  token: string;
  created_at: Date;
  expires_at: Date;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface Context {
  userId?: string;
} 