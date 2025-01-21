import Nav from '@/components/admin/Nav';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import { useRouter } from 'next/router';

export default function SLayout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (!session) {
  //     router.push('/auth/sign-in');
  //   }
  // }, [session, router]);

  if (!session) {
    return null; // Prevent rendering until redirection occurs
  }

  return (
    <div className="flex flex-col md:flex-row justify-center py-11 min-h-screen text-[#000000bc]">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center p-2 w-full">
        {session && (
          <button onClick={() => setShowNav(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        )}

        <div className="flex grow justify-center mr-8">
          <Logo />
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex gap-4 w-full">
        {/* Sticky Navigation */}
        <div className="hidden md:block sticky top-0 h-screen">
          <Nav show={showNav} />
        </div>

        {/* Main Content Area */}
        <div className="flex-grow bg-white p-4 mr-8 mb-2 w-full md:w-[70%]">
          {children}
        </div>
      </div>
    </div>
  );
}
