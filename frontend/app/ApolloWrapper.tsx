"use client"

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client"
import { useMemo } from "react"

export default function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => {
    return new ApolloClient({
      link: new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || "/api/graphql",
        credentials: "same-origin",
      }),
      cache: new InMemoryCache(),
    })
  }, [])

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
