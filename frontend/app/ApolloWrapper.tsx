"use client";

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { useMemo } from 'react';

export default function ApolloWrapper({ children }) {
  const client = useMemo(() => new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_API_URL || 'http://backend:4000/graphql',
      fetchOptions: { cache: 'no-store' },
    }),
    cache: new InMemoryCache(),
  }), []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
} 