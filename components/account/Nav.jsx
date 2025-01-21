import { handleSignOut } from '@/lib/auth/signOutLogic';
import {
  BadgeOutlined,
  CardGiftcardOutlined,
  HouseOutlined,
  InfoOutlined,
  KeyboardReturnOutlined,
  LocalMallOutlined,
  Logout,
  PaymentOutlined,
  PeopleAltOutlined,
  PersonOutlineSharp,
  TextsmsOutlined,
} from '@mui/icons-material';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import css from 'styled-jsx/css';

const Div = styled.div`
  padding: 20px 0;
  padding-left: 20px;

  li a {
    text-decoration: none;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    gap: 20px;
    width: 100%;
  }
  li button {
    text-decoration: none;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    gap: 18px;
    width: 34%;
  }
  li {
    list-style-type: none;
    list-style: none;
    font-family: 'Futura Std Book';
    font-weight: 100;
    font-size: 0.8rem;
    color: #0000007e;
    padding: 7px 0;
  }
  h2 {
    border-bottom: 1px solid #cccccc;
    width: 80%;
    padding: 12px 0;
    margin-bottom: 5px;
  }

  .noborder {
    border-bottom: none;
    padding: 0;
    margin-bottom: 0;
  }
  ${(props) =>
    props.noborder &&
    css`
      padding: 15px 0;
      padding-left: 20px;
    `}
`;

export default function Nav() {
 
  return (
    <>
      <Div className="bg-white flex flex-col  ">
        <li>
          <Link href={'/account/orders'}>
            <LocalMallOutlined
              style={{
                fontSize: '1.6rem',
                color: '#000000bc',
                marginBottom: '5px',
              }}
            />{' '}
            <h2>My Orders</h2>
          </Link>
        </li>
        <li>
          <Link href={'/account/returns'}>
            <KeyboardReturnOutlined
              style={{
                fontSize: '1.6rem',
                color: '#000000bc',
                marginBottom: '5px',
              }}
            />{' '}
            <h2>My Returns</h2>{' '}
          </Link>
        </li>
      </Div>

      <Div noborder className="bg-white flex flex-col  ">
        <li className="noborder">
          <Link href={'/account/cards'}>
            <CardGiftcardOutlined
              style={{
                fontSize: '1.6rem',
                color: '#000000bc',
                marginBottom: '5px',
              }}
            />{' '}
            <h2 className="noborder">Gift cards & e-gift cards</h2>
          </Link>
        </li>
      </Div>
      <Div className="bg-white flex flex-col  ">
        <li>
          <Link href={'/account/profile'}>
            {' '}
            <BadgeOutlined
              style={{
                fontSize: '1.6rem',
                color: '#000000bc',
                marginBottom: '5px',
              }}
            />
            <h2>My details</h2>
          </Link>
        </li>
        <li>
          <Link href={'/account/address'}>
            <HouseOutlined
              style={{
                fontSize: '1.6rem',
                color: '#000000bc',
                marginBottom: '5px',
              }}
            />{' '}
            <h2>Address book</h2>
          </Link>
        </li>
        <li>
          <Link href={'/account/payment-details'}>
            <PaymentOutlined
              style={{
                fontSize: '1.6rem',
                color: '#000000bc',
                marginBottom: '5px',
              }}
            />{' '}
            <h2>Payment methods</h2>{' '}
          </Link>
        </li>
        <li>
          <Link href={'/returns'}>
            <TextsmsOutlined
              style={{
                fontSize: '1.6rem',
                color: '#000000bc',
                marginBottom: '5px',
              }}
            />{' '}
            <h2>Contact Preferences</h2>{' '}
          </Link>
        </li>
        <li>
          <Link href={'/returns'}>
            <PeopleAltOutlined
              style={{
                fontSize: '1.6rem',
                color: '#000000bc',
                marginBottom: '5px',
              }}
            />{' '}
            <h2>Social accounts</h2>{' '}
          </Link>
        </li>
      </Div>

      <Div noborder className="bg-white flex flex-col  " >
        <li className="noborder" >
          <button onClick={handleSignOut}>
            <Logout
              style={{
                fontSize: '1.6rem',
                color: '#000000bc',
                marginBottom: '5px',
                transform: 'rotate(180deg)',
              }}
            />{' '}
            <h2 className="noborder">Sign out</h2>
          </button>
        </li>
      </Div>
    </>
  );
}
