import Nav from "@/components/admin/Nav";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { useRouter } from "next/router";

export default function SLayout({ children, authorized }) {
  const [showNav, setShowNav] = useState(false);
  const router = useRouter();

  // Automatically set showNav to true for larger screens (md and above)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };

    // Run on mount and on window resize
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Close Nav on route change (for mobile)
  useEffect(() => {
    const handleRouteChange = () => {
      if (window.innerWidth < 768) {
        setShowNav(false);
      }
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  return (
    <div className="flex flex-col md:flex-row justify-center py-11 min-h-screen text-[#000000bc] relative">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center p-2 w-full ">
        {authorized && (
          <button onClick={() => setShowNav((prev) => !prev)}>
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

      {/* Navigation Area */}
      {showNav && (
        <div
          className={`${
            window.innerWidth < 768
              ? "absolute inset-0 bg-gray-800 bg-opacity-75 z-40"
              : "relative w-auto "
          }`}
        >
          <div
            className={`${
              window.innerWidth < 768
                ? "absolute top-0 left-0 w-[80%] h-full bg-white shadow-lg z-50"
                : "sticky w-full mr-4 top-0 h-screen"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <Nav show={showNav} />
          </div>
        </div>
      )}

      {/* Main Content Layout */}
      <div
        className={`flex-grow bg-white p-4 mr-8 mb-2 w-full ${
          window.innerWidth >= 768 ? "md:w-[70%]" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
