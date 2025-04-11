import { ApolloServer } from 'apollo-server';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { Resend } from 'resend';
import dotenv from 'dotenv';
import { User, AuthPayload, Context } from './types';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const resend = new Resend(process.env.RESEND_API_KEY);

const typeDefs = `
  type User {
    id: ID!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
  }

  type Mutation {
    signup(email: String!, password: String!): AuthPayload!
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
      const result = await pool.query<User>('SELECT * FROM users WHERE id = $1', [context.userId]);
      return result.rows[0];
    },
  },
  Mutation: {
    signup: async (_: any, { email, password }: { email: string; password: string }): Promise<AuthPayload> => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query<User>(
          'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
          [email, hashedPassword]
        );
        const user = result.rows[0];
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
        return { token, user };
      } catch (error: any) {
        if (error.code === '23505') {
          throw new Error('Email already exists');
        }
        throw error;
      }
    },

    login: async (_: any, { email, password }: { email: string; password: string }): Promise<AuthPayload> => {
      const result = await pool.query<User>('SELECT * FROM users WHERE email = $1', [email]);
      const user = result.rows[0];
      
      if (!user) {
        throw new Error('Invalid email or password');
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Invalid email or password');
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
      return { token, user };
    },

    forgotPassword: async (_: any, { email }: { email: string }): Promise<boolean> => {
      const result = await pool.query<User>('SELECT * FROM users WHERE email = $1', [email]);
      const user = result.rows[0];
      
      if (!user) {
        throw new Error('User not found');
      }

      const token = uuidv4();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1);

      await pool.query(
        'INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
        [user.id, token, expiresAt]
      );

      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Password Reset',
        html: `Click <a href="${resetUrl}">here</a> to reset your password. This link will expire in 1 hour.`,
      });

      return true;
    },

    resetPassword: async (_: any, { token, newPassword }: { token: string; newPassword: string }): Promise<boolean> => {
      const result = await pool.query(
        'SELECT * FROM password_reset_tokens WHERE token = $1 AND expires_at > NOW()',
        [token]
      );
      const resetToken = result.rows[0];
      
      if (!resetToken) {
        throw new Error('Invalid or expired token');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await pool.query('UPDATE users SET password = $1 WHERE id = $2', [
        hashedPassword,
        resetToken.user_id,
      ]);

      await pool.query('DELETE FROM password_reset_tokens WHERE id = $1', [resetToken.id]);
      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }): Context => {
    const token = req.headers.authorization || '';
    try {
      const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET!) as { userId: string };
      return { userId: decoded.userId };
    } catch (error) {
      return {};
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
}); 