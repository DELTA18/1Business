import { Button } from "@/components/ui/button";
import { signIn } from "./api/auth/[...nextauth]/route";
import { auth } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex text-amber-200 flex-col items-center justify-between p-24">
      <h1>Home</h1>
      <Button variant={"secondary"}>Lessgoo</Button>

      {session ? (
        <>
          <p className="text-4xl text-green-600 p-3">
            Signed in as {session.user?.email}
          </p>
          <p className="text-4xl text-green-600 p-3">{session.user?.name}</p>
        </>
      ) : (
        <>
          <p>Not signed in</p>
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button type="submit">Signin with Google</button>
          </form>
        </>
      )}
    </main>
  );
}
