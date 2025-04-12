import { ApolloServer } from 'apollo-server';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { User, AuthPayload, Context } from './types';
import cors from 'cors';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

const typeDefs = `
  type User {
    id: ID!
    email: String!
    username: String!
    imageUrl: String
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
    users: [User!]!
  }

  type Mutation {
    signup(email: String!, password: String!, username: String!, imageUrl: String): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    forgotPassword(email: String!): Boolean!
    resetPassword(token: String!, newPassword: String!): Boolean!
  }
`;

const resolvers = {
  Query: {
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
  },
  Mutation: {
    signup: async (_: any, { email, password, username, imageUrl }: { email: string; password: string; username: string; imageUrl?: string }): Promise<AuthPayload> => {
      console.log('Signup attempt with:', { email, password, username, imageUrl });
      
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

        console.log('Supabase response:', { data, error });

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }
        if (!data.user) {
          console.error('No user data received');
          throw new Error('Failed to create user');
        }

        const token = data.session?.access_token;
        if (!token) {
          console.error('No session token received');
          throw new Error('Failed to generate token');
        }

        const userData = {
          id: data.user.id,
          email: data.user.email!,
          username: data.user.user_metadata?.username || username,
          imageUrl: data.user.user_metadata?.imageUrl || null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        console.log('Returning user data:', userData);

        return { 
          token, 
          user: userData
        };
      } catch (error) {
        console.error('Signup error:', error);
        throw error;
      }
    },

    login: async (_: any, { email, password }: { email: string; password: string }): Promise<AuthPayload> => {
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

    forgotPassword: async (_: any, { email }: { email: string }): Promise<boolean> => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.FRONTEND_URL}/reset-password`,
      });

      if (error) throw error;
      return true;
    },

    resetPassword: async (_: any, { token, newPassword }: { token: string; newPassword: string }): Promise<boolean> => {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
  context: async ({ req }): Promise<Context> => {
    const token = req.headers.authorization || '';
    try {
      const { data: { user }, error } = await supabase.auth.getUser(token.replace('Bearer ', ''));
      if (error) throw error;
      return { userId: user?.id };
    } catch (error) {
      return {};
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
}); 