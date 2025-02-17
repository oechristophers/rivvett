import {
    Close,
    InfoOutlined,
    KeyboardReturnOutlined,
    LocalMallOutlined,
    PersonOutlineSharp,
    TextsmsOutlined,
  } from '@mui/icons-material';
  import { signOut, useSession } from 'next-auth/react';
  import Link from 'next/link';
  import React from 'react';
  import styled from 'styled-components';
  import css from 'styled-jsx/css';
  
  const Box = styled.div`
    ${(props) =>
      props.a &&
      `
        padding: 5px 20px;
        display: flex;
        background-color: #00000013;
        align-items: center;
        justify-content: space-between;
        h2 {
          font-size: 1rem;
          font-family: 'Futura Std Heavy';
        }
        span {
          font-family: 'Futura Std Book';
          padding-top: 3px;
        }
        a {
          color: #000000e0;
          font-size: 0.9rem;
        }
      `};
  
    button {
      font-family: 'Futura Std Book';
      padding-top: 3px;
      font-size: 0.8rem;
      text-decoration: underline;
    }
  
    ${(props) =>
      props.b &&
      `
        padding: 20px;
        gap: 15px;
        display: flex;
        flex-direction: column;
  
        ul {
          list-style-type: none;
          list-style: none;
        }
      `};
    li a {
      text-decoration: none;
      color: black;
      display: flex;
      align-items: center;
      gap: 20px;
    }
    li {
      list-style-type: none;
      list-style: none;
      font-family: 'Futura Std Book';
      font-weight: 100;
      font-size: 0.8rem;
      color: #0000007e;
    }
  `;
  export default function MobAccountNav({ }) {
    const { data: session, status } = useSession();
    const isLoading = status === 'loading';
    const username = session?.user?.name;
    const toggleAcc = () => {
      setAccOpen((prev) => !prev);
    };
    const handleSignOut = async () => {
      await signOut();
      setAccOpen(false);
    };
    return (
      <div
        className={` 
        flex 
        flex-col 
        p-0 
        bg-[#f8f9fa] 
        border 
        border-gray-300 
        shadow-lg 
        transition-top 
        ease-in-out 
        duration-700 
        transform 
        z-[12]
      `}
        accOpen
      >
        {!session && (
          <Box a>
            <section
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <span className="space-x-2">
                <Link href={'/auth/sign-in'}>Sign In</Link> |
                <Link href={'/auth/sign-in'}>Join</Link>{' '}
              </span>
             
            </section>
          </Box>
        )}
  
        {session && (
          <Box a>
            <section
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <h2>
                <strong>Hi {username}</strong>
              </h2>
              ,<button onClick={handleSignOut}>Sign out</button>
            </section>
          </Box>
        )}
  
        <Box b>
          <li>
            <Link href={'/account'}>
              {' '}
              <PersonOutlineSharp
                style={{ fontSize: '1.6rem', color: '#000000bc' }}
              />
              My Account
            </Link>
          </li>
          <li>
            <Link href={'/account/orders'}>
              <LocalMallOutlined
                style={{ fontSize: '1.6rem', color: '#000000bc' }}
              />{' '}
              My Orders
            </Link>
          </li>
          <li>
            <Link href={'/account/returns'}>
              <KeyboardReturnOutlined
                style={{ fontSize: '1.6rem', color: '#000000bc' }}
              />
              My Returns
            </Link>
          </li>
          <li>
            <Link href={'/account/returns'}>
              <InfoOutlined style={{ fontSize: '1.6rem', color: '#000000bc' }} />
              Returns Information
            </Link>
          </li>
          <li>
            <Link href={'/account/returns'}>
              <TextsmsOutlined
                style={{ fontSize: '1.6rem', color: '#000000bc' }}
              />
              Contact Preferences
            </Link>
          </li>
        </Box>
      </div>
    );
  }
  