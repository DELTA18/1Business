import { Suspense } from "react";
import RegisterOnboarding from "./RegisterOnboarding";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-400">Loading onboarding...</div>}>
      <RegisterOnboarding />
    </Suspense>
  );
}
