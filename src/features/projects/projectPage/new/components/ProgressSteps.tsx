// components/ProgressSteps.tsx
"use client";

import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { UseFormReturn } from "react-hook-form";

interface ProgressStepsProps {
  currentStep: number;
  form?: UseFormReturn<any>;
}

export default function ProgressSteps({ currentStep, form }: ProgressStepsProps) {
  const steps = [
    { id: 1, name: 'Project Details' },
    { id: 2, name: 'Team & Contacts' },
    { id: 3, name: 'Classification' },
    { id: 4, name: 'Support & Funding' },
    { id: 5, name: 'Documents' },
    { id: 6, name: 'Review' },
  ];

  const handleStepClick = async (stepId: number) => {
    if (stepId === currentStep) return;
    
    // Validate current step before moving forward
    if (stepId > currentStep) {
      const isValid = await form?.trigger();
      if (!isValid) return;
    }
    
    // Update step
    form?.setValue(`currentStep`, stepId);
  };

  return (
    <nav className="mb-8">
      <ol className="flex items-center justify-center space-x-4 overflow-x-auto py-4">
        {steps.map((stepItem, index) => (
          <li key={stepItem.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <Button
                type="button"
                variant="ghost"
                className={cn(
                  'w-8 h-8 rounded-full p-0',
                  currentStep >= stepItem.id
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-white text-gray-900 hover:bg-gray-300'
                )}
                onClick={() => handleStepClick(stepItem.id)}
              >
                {stepItem.id}
              </Button>
              <span className={cn(
                'mt-2 text-xs font-medium',
                currentStep >= stepItem.id ? 'text-blue-600' : 'text-gray-500'
              )}>
                {stepItem.name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={cn(
                'h-0.5 w-16 mx-4',
                currentStep > stepItem.id ? 'bg-blue-600' : 'bg-gray-200'
              )} />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}