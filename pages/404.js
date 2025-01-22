import React from 'react';
import Link from 'next/link';
import { CardStackDemo } from '@/components/frontend/404/CardStack';

const Custom404 = () => {
  return (
    <div className='max-h-screen overflow-y-hidden bg-[#060606]' style={{ textAlign: 'center', padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
        <h1 className='text-[#fff] text-4xl'>404!</h1>
        <h2 className='text-[#fff] text-xl'>Page Not Found</h2>
        <Link href='/'>
          <p className='text-[#fff] text-lg'>Back to Home</p>
        </Link>
      <CardStackDemo/>
    </div>
  );
};

export default Custom404;
