// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      googleId?: string;
      registrationCompleted?: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    googleId?: string;
    registrationCompleted?: boolean;
  }
}
