import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import dotenv from 'dotenv';

dotenv.config();

// Auth client for login/signup
const authHttpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_AUTH_GRAPHQL_URL || 'http://localhost:4000/',
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export const authClient = new ApolloClient({
  link: authLink.concat(authHttpLink),
  cache: new InMemoryCache(),
  credentials: 'include',
});

// Hasura client for data queries
const hasuraHttpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL || 'http://localhost:8080/v1/graphql',
  credentials: 'include',
});

const hasuraLink = setContext((_, { headers }) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET || '',
    }
  }
});

export const hasuraClient = new ApolloClient({
  link: hasuraLink.concat(hasuraHttpLink),
  cache: new InMemoryCache(),
  credentials: 'include',
}); 