// /app/register/step1/page.tsx
import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import the client component to ensure it's client-only
const RegisterOnboarding = dynamic(
  () => import("./RegisterOnboarding"),
  { ssr: false } // disable SSR to prevent prerender errors
);

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-400">Loading onboarding...</div>}>
      <RegisterOnboarding />
    </Suspense>
  );
}
