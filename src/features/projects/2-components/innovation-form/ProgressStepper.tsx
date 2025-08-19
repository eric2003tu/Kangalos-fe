import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressStepperProps {
  currentStep: number;
  stepTitles: string[];
}

export const ProgressStepper = ({ currentStep, stepTitles }: ProgressStepperProps) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {stepTitles.map((title, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isLast = index === stepTitles.length - 1;

          return (
            <div key={index} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                    isCompleted && "bg-success text-success-foreground",
                    isActive && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                    !isActive && !isCompleted && "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    stepNumber
                  )}
                </div>
                <div className="mt-2 text-center">
                  <div
                    className={cn(
                      "text-xs font-medium transition-colors",
                      isActive && "text-primary",
                      isCompleted && "text-success",
                      !isActive && !isCompleted && "text-muted-foreground"
                    )}
                  >
                    Step {stepNumber}
                  </div>
                  <div
                    className={cn(
                      "text-xs mt-1 max-w-20 leading-tight",
                      isActive && "text-foreground",
                      isCompleted && "text-success",
                      !isActive && !isCompleted && "text-muted-foreground"
                    )}
                  >
                    {title}
                  </div>
                </div>
              </div>
              {!isLast && (
                <div className="flex-1 h-0.5 mx-4">
                  <div
                    className={cn(
                      "h-full transition-colors duration-300",
                      isCompleted ? "bg-success" : "bg-border"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};