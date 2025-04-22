"use client";

import { useMemo, PropsWithChildren } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";

export default function ApolloWrapper({ children }: PropsWithChildren) {
  const client = useMemo(() => new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_API_URL || 'http://backend:4000/graphql',
    }),
    cache: new InMemoryCache(),
  }), []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
