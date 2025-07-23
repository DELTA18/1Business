import { auth } from "./api/auth/[...nextauth]/route";
import Image from "next/image";
import CreatePost from "@/components/CreatePost";


export default async function Home() {
  const session = await auth();

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users`, {
    cache: "no-store", // Always get fresh data
  });

  const data = await res.json();
  const users = data.users || [];

  return (
    <main className="flex flex-col items-center justify-center gap-10 p-24">
      <h1 className="text-7xl font-bold text-amber-200">Home</h1>

      {session ? (
        <>
          <p className="text-2xl text-green-500">Signed in as {session.user?.email}</p>
          <p className="text-2xl font-bold text-green-600">Welcome, {session.user?.name}</p>

          <CreatePost />
          <section className="mt-10 w-full max-w-4xl">
        <h2 className="text-3xl font-semibold text-white mb-6">All Registered Users:</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {users.map((user: any) => (
            <div
              key={user._id}
              className="bg-white rounded-xl shadow-md p-16 text-center"
            >
              <Image
                src={user.image || "/default-avatar.png"}
                alt={user.name}
                width={80}
                height={80}
                className="rounded-full mx-auto mb-2"
              />
              <p className="text-gray-800 font-medium">{user.name}</p>
            </div>
          ))}
        </div>
      </section>
        </>
      ) : (
        <p className="text-lg text-red-500">Not signed in</p>
      )}

      
    </main>
  );
}
