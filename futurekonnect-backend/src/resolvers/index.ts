import { supabase } from '../config/supabase';
import { Context } from '../types';

const queryResolvers = {
  me: async (_: any, __: any, context: Context) => {
    if (!context.userId) {
      throw new Error('Not authenticated');
    }
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', context.userId)
      .single();
    
    if (error) throw error;
    return {
      ...user,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    };
  },
  users: async (_: any, __: any, context: Context) => {
    if (!context.userId) {
      throw new Error('Not authenticated');
    }
    const { data: users, error } = await supabase
      .from('users')
      .select('*');
    
    if (error) throw error;
    return users.map(user => ({
      ...user,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    }));
  },
};

const mutationResolvers = {
  signup: async (_: any, { email, password, username, imageUrl }: { email: string; password: string; username: string; imageUrl?: string }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            imageUrl: imageUrl || null
          }
        }
      });

      if (error) throw error;
      if (!data.user) throw new Error('Failed to create user');

      const token = data.session?.access_token;
      if (!token) throw new Error('Failed to generate token');

      return { 
        token, 
        user: {
          id: data.user.id,
          email: data.user.email!,
          username: data.user.user_metadata?.username || username,
          imageUrl: data.user.user_metadata?.imageUrl || null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      };
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  login: async (_: any, { email, password }: { email: string; password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    if (!data.user) throw new Error('Invalid email or password');

    const token = data.session?.access_token;
    if (!token) throw new Error('Failed to generate token');

    return { 
      token, 
      user: {
        id: data.user.id,
        email: data.user.email!,
        username: data.user.user_metadata?.username || '',
        imageUrl: data.user.user_metadata?.imageUrl || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    };
  },

  forgotPassword: async (_: any, { email }: { email: string }) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.FRONTEND_URL}/reset-password`,
    });

    if (error) throw error;
    return true;
  },

  resetPassword: async (_: any, { token, newPassword }: { token: string; newPassword: string }) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) throw error;
    return true;
  },
};

export const resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
}; 