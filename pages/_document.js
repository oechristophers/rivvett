import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head >
      <meta name="theme-color" content="#222" /> 
      <style>{`
          html{
            background-color: #222; 
            overscroll-behavior: contain; 
          }
        `}</style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
