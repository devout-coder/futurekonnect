export interface User {
  id: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
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
  user: Omit<User, 'password'>;
}

export interface Context {
  userId?: string;
} 