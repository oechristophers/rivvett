import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: white;
  position: relative;
  z-index: 40;
  display: flex;
  padding: 0 40px;
  justify-content: right;
  height: 25px;
  img {
    width: 15px;
    height: 15px;
  }
  div {
    display: flex;
    height: 100%;
    & > :first-of-type {
      border-left: 1px solid #0000002a;
    }
  }
  a {
    padding: 0 15px;
    padding-top: 5px;
    border-right: 1px solid #0000002a;
    height: 100%;
    text-decoration: none;
    color: #000000b5;
    font-family: 'Futura Std Book';
    letter-spacing: 1.2px;
    font-size: 0.7rem;
  }
  @media screen and (max-width: 950px) {
    display: none;
  }
`;
export default function PreHeader() {
  return (
    <Container>
      <div className="pre">
        <Link href={'#'}>Marketplace</Link>
        <Link href={'#'}>Help & FAQ&apos;s</Link>
        <Link href={'#'}>
          <Image
            width={100}
            height={100}
            layout="intrinsic"
            src="/flags/us.png"
            alt=""
          />
        </Link>
      </div>
    </Container>
  );
}
