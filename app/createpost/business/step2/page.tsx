'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

const steps = [
  'Operational Plans',
  'Preferred Location',
  'Any Teammates?',
  'Launch Time',
  '🔥 Let’s Build This Business!',
]

export default function FlowStepWizard() {
  const [stepIndex, setStepIndex] = useState(0)

  const handleNext = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex((prev) => prev + 1)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-black text-white p-6 space-y-8">
      <h1 className="text-4xl font-bold tracking-tight text-center">
        Your Business Journey
      </h1>

      <div className="relative h-48 w-full max-w-lg flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={stepIndex}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -30 }}
            transition={{ duration: 0.5 }}
            className="bg-white text-black px-6 py-4 rounded-2xl shadow-lg text-xl text-center"
          >
            {steps[stepIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {stepIndex < steps.length - 1 ? (
        <Button onClick={handleNext} className="text-white bg-indigo-600 hover:bg-indigo-700">
          Continue
        </Button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-green-400 text-xl font-semibold mt-4"
        >
          🚀 You’re all set!
        </motion.div>
      )}
    </div>
  )
}
