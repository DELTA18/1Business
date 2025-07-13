"use server";

import { signIn } from "@/app/api/auth/[...nextauth]/route";

export default async function SignInForm() {
  return (
    <form
      action={async () => {
        await signIn("google");
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  );
}
