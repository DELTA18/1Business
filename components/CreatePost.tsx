"use client";

import { useRouter } from "next/navigation";
export default function CreatePost() {
    const router = useRouter();
    return (
        <section className=" flex flex-col items-center justify-center gap-10 p-10 from-blue-400 to-blue-700 bg-gradient-to-br hover:from-blue-600 hover:to-purple-900 transition-colors duration-300 rounded-md cursor-pointer"
        onClick={() => router.push("/createpost/initiator")}>
            <div className="text-3xl font-bold text-white">
              Create Your First Post
            </div>
          </section>
    )
}