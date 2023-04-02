import Footer from '@/layout/footer';
import Header from '@/layout/header';
import GlobalStyles from '@/styles/globalStyle';
import { Global } from '@emotion/react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import React from 'react';
import { RecoilRoot } from 'recoil';

// const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  /**
   * react-query 사용을 위한 선언
   */
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Global styles={GlobalStyles} />
        <Hydrate state={pageProps.dehydratedState}>
          <Header />
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
          <Footer />
        </Hydrate>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
