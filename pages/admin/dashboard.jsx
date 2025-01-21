import { useSession } from "next-auth/react";
import Layout from "./layout";

export default function AdminDashboard() {
  const { data: session, status } = useSession();

  // Handle loading state
  if (status === "loading") {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  // Handle no session (user not logged in)
  if (!session) {
    return (
      <Layout>
        <div>Please log in to access your profile.</div>
      </Layout>
    );
  }

  // Check if the user is a customer (assuming you're checking role from session)
  const isCustomer = session?.user?.role === "customer"; // Adjust according to your session data structure

  // Handle when the user is not a customer (e.g., admin or other role)
  if (!isCustomer) {
    return (
      <Layout>
        <div>Access denied: You are not a customer.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="text-blue-900 flex justify-between">
        <h2>
          Welcome back, <b>{session?.user?.name}</b>
        </h2>
        <div className="flex bg-gray-300 text-black gap-1 rounded-lg overflow-hidden">
          <img
            src={session?.user?.image || "/default-profile.png"} // Fallback if no image
            alt="dp"
            className="w-6 h-6"
          />
          <span className="px-2">{session?.user?.email}</span>
        </div>
      </div>

      <div className="mt-4">
        <h3>Your Account Details:</h3>
        {/* Display more customer-related info if necessary */}
      </div>
    </Layout>
  );
}
