"use client";

import { signIn } from "next-auth/react";

export default function SignInForm() {
  return (
    <div className="flex justify-center mt-20">
      <button
        onClick={() => signIn("google")}
        className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
      >
        Sign in with Google
      </button>
    </div>
  );
}
