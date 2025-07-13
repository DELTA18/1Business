'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function RegisterStep2() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSelectAccountType = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    console.log(params);
    params.set('accountType', type)
    console.log(params, "________");
    router.push(`/register/complete?${params.toString()}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-4">Select Account Type</h1>

      <div className="space-y-4">
        <Button className="w-full" onClick={() => handleSelectAccountType('start-business')}>
          Person who wants to start a business
        </Button>

        <Button className="w-full" onClick={() => handleSelectAccountType('share-profession')}>
          Person who wants to share their profession
        </Button>

        <Button className="w-full" onClick={() => handleSelectAccountType('share-physical')}>
          Person who wants to share a physical thing (space or machine)
        </Button>
      </div>
    </div>
  );
}
