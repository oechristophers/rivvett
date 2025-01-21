import { signIn } from "next-auth/react";

export const handleGithubSignIn = async () => {
  try {
    await signIn("github",{
        callbackUrl: "/account",
    })
  } catch (error) {
    throw error;
  }
};
