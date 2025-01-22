"use client";

import Nav from "@/components/account/Nav";
import Spinner from "@/components/frontend/Spinner";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";

const Dash = styled.div`
  display: flex;
  gap: 5px;
  height: 100%;
  align-items: center;

  &::before {
    content: attr(data-initials);
    position: relative;
    display: block;
    width: 60px;
    height: 60px;

    color: white;
    border-radius: 50%;
    background-color: #000000bc;
    text-align: center;
    line-height: 60px;
    font-size: 18px;
    margin-right: 10px;
  }
`;

const Span = styled.span`
  font-family: "Futura Std Heavy";
`;

export default function Layout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const path = router.pathname.split("/")[2];
  const isLoading = status === "loading";
  const username = session?.user?.name;
  const initials = username?.slice(0, 2).toUpperCase() || "NA";

  useEffect(() => {
    if (!session && !isLoading) {
      router.push("/auth/sign-in");
    }
  }, [session, isLoading, router]);

  // Show a loading state or a placeholder while the session is loading
  if (!session && isLoading) {
    return (
      
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
    );
  }

  // Prevent rendering until the redirect logic runs
  if (!session) {
    return null;
  }

  return (
    <div className="flex justify-center py-11 min-h-screen gap-5 text-[#000000bc]">
      <div className="w-80 gap-3 mb-4 flex flex-col sticky h-full top-0">
        <Span className="text-5xl mb-4">
          <Link href={"/"}>Rivvet</Link>
        </Span>
        <div className="bg-white relative p-7 flex">
          <Dash data-initials={initials}>
            <section className="flex flex-col mt-5 pl-4">
              <p>Hi,</p>
              <p>
                <strong>{username || "User"}</strong>
              </p>
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
