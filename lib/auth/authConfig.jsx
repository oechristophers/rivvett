
import GoogleProvider from 'next-auth/providers/google';
import Nodemailer from 'next-auth/providers/nodemailer';
import NextAuth from 'next-auth';
import clientPromise from '../mongodb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
// import { setName } from "./setNameServerAction";
export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/sign-in',

    // signOut: '/auth/sign-out',
    error: '/auth/auth-error',
    verifyRequest: '/auth/auth-success',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === 'update' && session?.name !== token.name) {
        token.name = session.name;
        try {
          await setName(token.name);
        } catch (error) {
          console.error('Failed to update name:', error.message);
        }
      }
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
    async session({ session, token }) {
      console.log('Session callback:', { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
    async signIn({ user }) {
      if (!user.role) {
        user.email === 'oechristophers2023@gmail.com'
          ? (user.role = 'admin')
          : (user.role = 'customer'); // Default role for new users
      }
      return true;
    },
  },
  debug: true,
});
