import '../styles/globals.css';
// import '../public/futura-font/style.css';
import { createGlobalStyle } from 'styled-components';
import { CartContextProvider } from '@/components/frontend/CartContext';
import { SessionProvider } from 'next-auth/react';
import useDeliveryUpdates from '@/lib/deliveryHook';
import { SpeedInsights } from '@vercel/speed-insights/next';
import isPropValid from '@emotion/is-prop-valid';
import { Toaster } from '@/components/ui/toaster';

const GlobalStyles = createGlobalStyle`
  html {
    background-color: #222;
  }
  body {
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: 'Futura Std Light', Arial, sans-serif; /* Added fallback fonts */
  }
`;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  useDeliveryUpdates();
  return (
    <>
      <SessionProvider session={session}>
        {' '}
        {/* Ensure session is passed */}
        <GlobalStyles shouldForwardProp={isPropValid} />
        <SpeedInsights />
        <Toaster />
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </SessionProvider>
    </>
  );
}
