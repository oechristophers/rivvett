import Nav from '@/components/account/Nav';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const Dash = styled.div`
  display: flex;
  gap: 5px;
  height: 100%;

  &::before {
    content: var(--initials, 'NA');
    top: 20;
    margin-top: -5px;
    width: fit-content;
    height: auto;
    color: white;
    border-radius: 50%;
    padding: 30px;
    background-color: #000000bc;
    margin-left: -35px;
  }
`;

const Span = styled.span`
  font-family: 'Futura Std Heavy';
`;

export default function Layout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const path = router.pathname.split('/')[2];
  const isLoading = status === 'loading';
  const username = session?.user?.name;
  const initials = username?.slice(0, 2).toUpperCase() || '';

  if (!session) {
    router.push('/auth/sign-in');
    return null; // Return null to avoid rendering the component when the user is not authenticated.  This prevents unnecessary re-renders.
  }

  return (
    <div className="flex justify-center py-11 min-h-screen gap-5 text-[#000000bc]">
      <div className="w-80 gap-3 mb-4 flex flex-col sticky h-full top-0">
        <Span className="text-5xl mb-4">
          <Link href={'/'}>Rivvet</Link>
        </Span>
        <div className="bg-white relative p-7 flex">
          <Dash style={{ '--initials': `"${initials}"` }}>
            <section className="flex flex-col mt-5 pl-4">
              {isLoading ? (
                <p>Loading...</p>
              ) : session ? (
                <>
                  <p>Hi,</p>
                  <p>
                    <strong>{username || 'User'}</strong>
                  </p>
                </>
              ) : (
                <p>Not signed in</p>
              )}
            </section>
          </Dash>
        </div>
        <Nav />
      </div>

      <div className="w-[40rem] flex flex-col mt-3 gap-4">
        <Span className="text-2xl mb-4">My Account</Span>
        {children}
      </div>
    </div>
  );
}
