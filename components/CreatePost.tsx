"use client";

import { useRouter } from "next/navigation";
import { use } from "react";
export default function CreatePost() {
    const router = useRouter();
    return (
        <section className=" flex flex-col items-center justify-center gap-10 p-10 bg-blue-400 rounded-md cursor-pointer"
        onClick={() => router.push("/createpost/step1")}>
            <div className="text-3xl font-bold text-white">
              Create Your First Post
            </div>
          </section>
    )
}