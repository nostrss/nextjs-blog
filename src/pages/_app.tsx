import { GlobalStyles } from '@/styles/globalStyle';
import { Global } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Global styles={GlobalStyles} />
      <Component pageProps={pageProps} />
    </QueryClientProvider>
  );
}
