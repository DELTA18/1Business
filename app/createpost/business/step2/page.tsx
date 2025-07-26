'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useBusinessPostStore } from '@/stores/userBusinessPostStore';

export default function Step2() {
  const router = useRouter();

  const { setStep2Data } = useBusinessPostStore();

  const [estimatedBudget, setEstimatedBudget] = useState('');
  const [availableMoney, setAvailableMoney] = useState('');
  const [fundingRequired, setFundingRequired] = useState(false);
  const [fundingAmount, setFundingAmount] = useState('');

  const handleNext = () => {
    // Save step 2 data to Zustand store
    setStep2Data({
      estimatedBudget,
      availableMoney,
      fundingRequired,
      fundingAmount,
    });
    router.push('/createpost/business/step3');
  };

  const handleBack = () => {
    router.push('/createpost/business/step1');
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-4 py-10">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-3xl font-bold text-center">Financial Details</h1>

        <div className="space-y-4">
          {/* Estimated Budget */}
          <div className="space-y-2">
            <Label>Estimated Budget (₹)</Label>
            <Input
              type="number"
              placeholder="Enter estimated budget"
              value={estimatedBudget}
              onChange={(e) => setEstimatedBudget(e.target.value)}
            />
          </div>

          {/* Available Money */}
          <div className="space-y-2">
            <Label>Available Money (₹)</Label>
            <Input
              type="number"
              placeholder="How much money do you already have?"
              value={availableMoney}
              onChange={(e) => setAvailableMoney(e.target.value)}
            />
          </div>

          {/* Funding Required */}
          <div className="flex items-center justify-between">
            <Label>Is Funding Required?</Label>
            <Switch
              checked={fundingRequired}
              onCheckedChange={setFundingRequired}
            />
          </div>

          {/* Funding Amount */}
          {fundingRequired && (
            <div className="space-y-2">
              <Label>How Much Funding is Needed? (₹)</Label>
              <Input
                type="number"
                placeholder="Enter funding amount"
                value={fundingAmount}
                onChange={(e) => setFundingAmount(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <Button variant="secondary" onClick={handleBack}>
            Back
          </Button>
          <Button onClick={handleNext}>
            Continue
          </Button>
        </div>
      </div>
    </main>
  );
}
