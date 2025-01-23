import { handleGoogleSignIn } from "@/lib/auth/googleSignIn";
import RootLayout from "@/pages/layout";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState, useTransition } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { handleGithubSignIn } from "@/lib/auth/githubSignin";
import styled from "styled-components";
import { useToast } from "@/hooks/use-toast";

const ImageDiv = styled.div`
  display: block;
  @media (max-width: 768px) {
    display: none;
  }
`;
const SignInPage = () => {
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({ email: "" });
  const router = useRouter();
  const { toast } = useToast();
  // Logout function
  async function logout() {
    await signOut();
  }

  // Handle form submission
  const handleSubmit = (ev) => {
    ev.preventDefault();
    startTransition(async () => {
      try {
        await handleEmailSignIn(formData.email); // Implement your email sign-in function
      } catch (error) {
        console.error("Error signing in:", error);
      }
    });
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    toast({
      title:
        'Due to an issue with our server, you can only use social accounts to login for now. Please bear with us as we try to resolve the issue.',
        variant:"destructive"
    });
  };

  return (
    <>
      <div className=" flex justify-center">
        <div className="grid grid-cols-1 md:flex items-center justify-center min-h-screen bg-[#eee] text-black">
          <div className="w-[25rem] p-8 rounded-xl shadow-lg text-center bg-white flex flex-col gap-5">
            <div className=" flex justify-center  ">
              <section
                className="bg-[#1c1c1c21] p-2 w-80 rounded-2xl flex  justify-center cursor-pointer "
                onClick={() => {
                  router.push("/");
                }}
              >
                <img
                  src="/images/2.png"
                  alt=""
                  className="max-w-[100%] max-h-[2rem]  "
                />
              </section>
            </div>

            <div className="flex flex-col w-full mt-4">
              <button
                className="flex items-center justify-center p-4 bg-transparent hover:bg-[#dfd9d94f] text-sm font-bold border rounded-2xl"
                onClick={handleGoogleSignIn}
              >
                <FcGoogle className="mr-5 w-6 h-6" />
                Continue with Google
              </button>
            </div>

            <div className="flex flex-col w-full mt-4">
              <button
                className="flex items-center justify-center p-4 bg-transparent hover:bg-[#dfd9d94f] text-sm font-bold border rounded-2xl"
                onClick={handleGithubSignIn}
              >
                <FaGithub className="mr-5 w-6 h-6" />
                Continue with GitHub
              </button>
            </div>

            {session && (
              <button
                className="flex items-center justify-center p-4 bg-transparent hover:bg-[#5a59594f] text-sm font-bold border rounded-2xl mt-4"
                onClick={logout}
              >
                Sign out
              </button>
            )}

            <div className="flex items-center ml-[10%] w-[80%] p-1">
              <div className="flex-grow h-[1px] bg-[hsl(0,0%,70%)]"></div>
              <span className="px-[0.1rem] text-[hsl(0,0%,70%)]">or</span>
              <div className="flex-grow h-[1px] bg-[hsl(0,0%,70%)]"></div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              <input
                maxLength={320}
                placeholder="Email Address"
                type="email"
                value={formData.email}
                onChange={(ev) =>
                  setFormData({
                    ...formData,
                    email: ev.target.value,
                  })
                }
                className="mb-4 p-2 py-4 w-full text-black border rounded-2xl"
                disabled={isPending}
                required
              />
              <button
                type="button"
                className="w-full bg-[#1c1c1ce5] hover:bg-[#2b2a2ae4] cursor-pointer text-white p-3 rounded-xl mb-4"
                onClick={handleClick}
              >
                Sign in with Email
              </button>
            </form>
          </div>
          <ImageDiv className="w-[23rem] ">
            <img
              className="max-w-[100%] max-h-[100%]"
              src="/images/zoomCollage4.webp"
              alt=""
            />
          </ImageDiv>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
