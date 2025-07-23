import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      try {
        if (account && profile) {
          console.log("🔄 Google login attempt:", profile.email);
          await dbConnect();

          const existingUser = await User.findOne({ email: profile.email });

          if (!existingUser) {
            console.log("🆕 Creating new user:", profile.email);
            await User.create({
              googleId: account.providerAccountId,
              name: profile.name,
              email: profile.email,
              image: profile.picture,
              registrationCompleted: false,
            });
          }

          token.email = profile.email;
        }

        // Always fetch latest user data
        await dbConnect();
        const user = await User.findOne({ email: token.email });

        if (user) {
          token.registrationCompleted = user.registrationCompleted;
          token.name = user.name;
          token.image = user.image;
          token.googleId = user.googleId;
        }

        return token;
      } catch (err) {
        console.error("❌ Error in jwt callback:", err);
        throw err;
      }
    },

    async session({ session, token }) {
      session.user.googleId = token.googleId;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;
      session.user.registrationCompleted = token.registrationCompleted;
      return session;
    },

    async redirect({ baseUrl }) {
      return `${baseUrl}/register/step1`;
    },
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions);
