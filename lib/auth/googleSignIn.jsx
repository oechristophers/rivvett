import { signIn } from "next-auth/react";

export const handleGoogleSignIn = async () => {
    try {
        await signIn("google",{
            callbackUrl: "/account",
        })
    } catch (error) {
        throw error
    }
};
