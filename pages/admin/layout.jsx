import SLayout from "@/components/admin/Layout";
import Spinner from "@/components/frontend/Spinner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Layout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Wait until the session is fully loaded
    if (status === "loading") return;

    // Check if the user is authorized
    if (status === "unauthenticated" || !session?.user?.isAdmin) {
      router.push("/auth/sign-in");
    } else {
      setAuthorized(true);
    }
  }, [session, status, router]);

  if (status === "loading") {
    // Optionally display a loading state while the session is being loaded
    return (
      <div
      style={{display:'flex',justifyContent:'center',width:'100%', height:'100vh',alignItems:'center'}}>
        <Spinner animation="border" role="status"></Spinner>
      </div>
    );
  }

  return (
    <div className="server">
      <SLayout authorized={authorized}>{children}</SLayout>
    </div>
  );
}
