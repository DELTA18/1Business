import { Button } from "@/components/ui/button";
import { signIn } from "./api/auth/[...nextauth]/route";
import { auth } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex text-amber-200 flex-col items-center justify-between p-24">
      <h1 className="text-7xl font-bold">Home</h1>

      {session ? (
        <>
          <p className="text-4xl text-green-600 p-3">
            Signed in as {session.user?.email}
          </p>
          <p className="text-4xl text-green-600 font-bold p-3">Welcome, {session.user?.name}</p>
        </>
      ) : (
        <>
          <p>Not signed in</p>
        </>
      )}
    </main>
  );
}
