
import { Button } from "@/components/ui/button"
// import  signIn  from "@/components/signIn"/
import { signIn,  } from "@/auth"
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <main className="flex text-amber-200 flex-col items-center justify-between p-24">
      <h1>Home</h1>
      <Button variant={"secondary"}>Lessgoo</Button>
      {session ? (
        <>
        
        <p className=" text-4xl text-green-600 p-3">signed in as {session.user?.email}</p>
        <p className=" text-4xl text-green-600 p-3"> {session.user?.name} </p>
        </>
      ) : (
        <>
        
        <p>not signed in</p>
        <form
            action={async () => {
              "use server"
              await signIn("google")
            }}
          >
            <button type="submit">Signin with Google</button>
          </form>
        </>
      )}


      
    </main>
  );
}
