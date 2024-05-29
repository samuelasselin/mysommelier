import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import '../locales/i18n'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
