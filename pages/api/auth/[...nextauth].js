import clientPromise from '@/lib/mongodb';
import { mongooseConnect } from '@/lib/mongoose';
import { Users } from '@/models/Accounts';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth, { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

const adminEmails = ['oechristophers2023@gmail.com']; // List of admin emails

export const authOptions = {
  trustHost: true,
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/sign-in',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (!user.email) throw new Error('Email not provided');
        
        // Ensure the database connection
        await mongooseConnect();
  
        const existingUser = await Users.findOne({ email: user.email });
  
        if (!existingUser) {
          // Create a new user if not found
          await Users.create({
            name: user.name,
            username: user.email.split('@')[0],
            email: user.email,
            image: user.image,
            role: adminEmails.includes(user.email)?'admin':'customer',  // Default to 'customer'
            provider: account.provider,
          });
        } else if (!existingUser.provider) {
          // Update provider if not already set
          existingUser.provider = account.provider;
          await existingUser.save();
        }
  
        return true;
      } catch (error) {
        console.error('Sign-In Error:', error);
        return false;
      }
    },
    async session({ session }) {
      try {
        await mongooseConnect();
  
        const userData = await Users.findOne({ email: session.user.email });
        if (userData) {
          session.user.role = userData.role || 'customer';
          session.user.isAdmin = adminEmails.includes(session.user.email);
          session.user.id = userData._id; 
        }
  
        return session; // Ensure session includes role and isAdmin
      } catch (error) {
        console.error('Error in session callback:', error);
        return session;
      }
    },
  },
};

export default NextAuth(authOptions);



// Admin Authorization Middleware
export async function isAdminRequest(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user.isAdmin) {
      console.log('Admin check failed:', session); // Debugging
      res.status(401).json({ message: 'Unauthorized: Admin access required' });
      return;
    }
    console.log('Admin authorized:', session); // Debugging
  } catch (error) {
    console.error('Error in isAdminRequest:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


// Customer Authorization Middleware


export async function isCustomerRequest(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session || session.user.role !== 'customer') {
      console.log('Customer check failed:', session); // Debugging
      res.status(401).json({ message: 'Unauthorized: Customer access required' });
      return;
    }
    console.log('Customer authorized:', session); // Debugging
  } catch (error) {
    console.error('Error in isCustomerRequest:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

