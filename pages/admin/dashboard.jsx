
import React from 'react';
import Layout from './layout';
import styled from 'styled-components';
const Div = styled.div`
  h1 {
    font-family: 'Futura Std Bold';
    letter-spacing: 1.2px;
    line-height: 1.5;
  }
`;
export default function index() {
  return (
    <Layout>
      <Div className="w-[100%] bg-[#000000bc] min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-white text-5xl font-bold text-center">
          Welcome <br />
          to your Rivvett Admin dashboard
        </h1>
      </Div>
    </Layout>
  );
}
