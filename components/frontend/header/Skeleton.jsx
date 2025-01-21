import React from 'react';
import Link from 'next/link';

export default function HeaderSkeleton() {
  return (
    <>
      <div
        className="bg-[#222] hidden md:block md:h-[60px] h-[50px] px-2 md:px-0 sm:-mt-1 relative overflow-hidden"
        style={{ zIndex: '20' }}
      >
        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#222] via-[#3b3b3b] to-[#222] bg-[length:200%_100%] animate-shimmer"></div>

        {/* Content */}
        <div className="relative z-10 py-0 px-[25px] hidden md:block">
          <div className="flex relative md:justify-between md:gap-0">
            <Link
              className="text-white no-underline relative z-30 p-0 pr-2.5 pt-10 border-r-0 w-[95px] h-[60px] transition-[padding] duration-300 ease-in-out md:pr-3.5 md:pt-2 md:w-[100px] md:flex md:justify-center md:items-center lg:pr-5"
              href="/"
            >
              <img src="/images/3.png" alt="Logo" />
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-[#403f3f] w-full h-[50px] hidden md:block relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#403f3f] via-[#545454] to-[#403f3f] bg-[length:200%_100%] animate-shimmer"></div>
        <div className="relative z-10"></div>
      </div>
    </>
  );
}
