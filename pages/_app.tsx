import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {ApolloProvider} from "@apollo/client/react";
import client from "@/core/apollo/client";

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  </>
}
