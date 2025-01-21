import { signOut } from 'next-auth/react';

export const handleSignOut = () => {
  signOut({
    callbackUrl: '/auth/sign-in', // Replace with the desired redirect URL
  });
};
