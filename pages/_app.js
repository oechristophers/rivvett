import "@/styles/globals.css";
import { createGlobalStyle } from "styled-components";
import "../public/futura-font/style.css";
import { CartContextProvider } from "@/components/CartContext";
import { useEffect, useState } from "react";

const GlobalStyles = createGlobalStyle`
  body{
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: 'Futura Std Light' ;

  }
`;

export default function App({ Component, pageProps }) {
 
  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}
