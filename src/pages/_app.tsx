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

/**
 * 애플리케이션의 루트 컴포넌트입니다.
 * @param {object} AppProps - 애플리케이션 속성 객체입니다.
 * @returns {JSX.Element} - 애플리케이션의 루트 엘리먼트를 반환합니다.
 */
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
