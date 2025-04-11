"use client";

import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from './contexts/AuthContext';
import { hasuraClient } from '../lib/apollo-client';

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApolloProvider client={hasuraClient}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ApolloProvider>
  );
} 