'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useBusinessPostStore } from '@/stores/userBusinessPostStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Wallet, DollarSign } from 'lucide-react';

export default function Step2() {
  const router = useRouter();
  const { setStep2Data } = useBusinessPostStore();

  const [estimatedBudget, setEstimatedBudget] = useState('');
  const [availableMoney, setAvailableMoney] = useState('');
  const [fundingRequired, setFundingRequired] = useState(false);
  const [fundingAmount, setFundingAmount] = useState('');

  const handleNext = () => {
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
    <motion.main
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen flex flex-col justify-center items-center px-4 py-10 bg-gradient-to-b from-gray-950 to-gray-900"
    >
      <div className="max-w-lg w-full space-y-8 bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/10">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">
            Financial Details
          </h1>
          <p className="text-gray-400 text-sm">Step 2 of 3</p>
        </div>

        <div className="space-y-5">
          {/* Estimated Budget */}
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Estimated Budget (₹)</Label>
            <div className="relative">
              <Wallet className="absolute left-3 top-3 text-gray-400" size={18} />
              <Input
                type="number"
                placeholder="Enter estimated budget"
                className="pl-10 focus:ring-2 focus:ring-blue-500/50"
                value={estimatedBudget}
                onChange={(e) => setEstimatedBudget(e.target.value)}
              />
            </div>
          </div>

          {/* Available Money */}
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Available Money (₹)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 text-gray-400" size={18} />
              <Input
                type="number"
                placeholder="How much money do you already have?"
                className="pl-10 focus:ring-2 focus:ring-blue-500/50"
                value={availableMoney}
                onChange={(e) => setAvailableMoney(e.target.value)}
              />
            </div>
          </div>

          {/* Funding Required */}
          <div className="flex items-center justify-between pt-2">
            <Label className="text-gray-300 text-sm">Is Funding Required?</Label>
            <Switch
              checked={fundingRequired}
              onCheckedChange={setFundingRequired}
            />
          </div>

          {/* Funding Amount (if required) */}
          <AnimatePresence>
            {fundingRequired && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-2"
              >
                <Label className="text-gray-300 text-sm">
                  How Much Funding is Needed? (₹)
                </Label>
                <Input
                  type="number"
                  placeholder="Enter funding amount"
                  value={fundingAmount}
                  onChange={(e) => setFundingAmount(e.target.value)}
                  className="focus:ring-2 focus:ring-blue-500/50"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <Button
            variant="secondary"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Back
          </Button>
          <Button
            onClick={handleNext}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:brightness-110"
          >
            Continue <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </motion.main>
  );
}
