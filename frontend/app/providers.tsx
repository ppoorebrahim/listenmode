"use client"

import ApolloWrapper from "./ApolloWrapper"

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloWrapper>{children}</ApolloWrapper>
}
