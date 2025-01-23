import React from "react";
import Link from "next/link";
import { CardStackDemo } from "@/components/frontend/404/CardStack";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #060606;
  height: 100vh;
`;
const Custom404 = () => {
  return (
    <Div
      className=""
      style={{
        textAlign: "center",
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 className="text-[#fff] text-4xl">404!</h1>
      <h2 className="text-[#fff] text-xl">Page Not Found</h2>
      <Link href="/">
        <p className="text-[#fff] text-lg">Back to Home</p>
      </Link>
      <CardStackDemo />
    </Div>
  );
};

export default Custom404;
