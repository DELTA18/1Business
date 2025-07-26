'use client';
import { useBusinessPostStore } from "@/stores/userBusinessPostStore";
export default function BusinessStep3() {
    const { step1Data } = useBusinessPostStore();
    const { step2Data } = useBusinessPostStore();
    console.log("Step 1 Data:", step1Data);
    console.log("Step 2 Data:", step2Data);
    return (
        <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Business Step 3</h1>
        <p>Content for Step 3 goes here.</p>
        {/* Add your form or content for Step 3 */}
        </div>
    );
    }