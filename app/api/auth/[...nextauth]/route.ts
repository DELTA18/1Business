import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "@/lib/prisma";

const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.googleId = account.providerAccountId;
        token.name = profile.name;
        token.email = profile.email;
        token.image = profile.picture;
        token.registrationCompleted = false;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.googleId = token.googleId;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;
      session.user.registrationCompleted = token.registrationCompleted;

      console.log(session)
      return session;
    },

    async redirect({ url, baseUrl }) {
      return `${baseUrl}/register/step1`;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);

export const { GET, POST } = handlers;
