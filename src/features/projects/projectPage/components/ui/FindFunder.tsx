"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FormData } from "@/features/projects/2-components/innovation-form/types";
import { ProgressStepper } from "@/features/projects/2-components/innovation-form/ProgressStepper";
import { Step4SupportFunding } from "./Step4SupportFunding";
import { Save } from "lucide-react";

const STORAGE_KEY = "innovation-form-draft";

const initialFormData: FormData = {
  projectName: "",
  description: "",
  primarySDG: "",
  primarySDGSolution: "",
  additionalSDGs: [],
  additionalSDGSolutions: {},
  projectTitle: "",
  year: "",
  executiveSummary: "",
  teamMembers: [],
  generalContact: {
    primaryPhone: "",
    primaryEmail: "",
    secondaryPhone: "",
    secondaryEmail: ""
  },
  fieldOfInnovation: "",
  innovationSubfield: "",
  expectedIP: [],
  ipStatus: {},
  pastFunding: {
    hasPastFunding: false,
    funders: [],
    supportTypes: [],
    supportProviders: [],
    supportProviderOther: "",
    yearSupportBegan: "",
    supportDuration: "",
    supportDurationUnit: "",
    fundingAmount: ""
  },
  futureFunding: {
    needsFunding: false,
    fundingTypes: [],
    nonMonetarySupport: [],
    nonMonetaryDescription: "",
    monetaryAmount: "",
    monetaryExplanation: "",
    expectedFunder: ""
  },
  documents: {
    required: {},
    optional: []
  }
};

const stepTitles = ["Support & Funding"];

export const FindFunder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const { toast } = useToast();

  useEffect(() => {
    const savedDraft = localStorage.getItem(STORAGE_KEY);
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData(parsedDraft);
        toast({
          title: "Draft Loaded",
          description: "Your previously saved draft has been loaded.",
        });
      } catch (error) {
        console.error("Error loading draft:", error);
      }
    }
  }, [toast]);

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const saveDraft = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      toast({
        title: "Draft Saved",
        description: "Your progress has been saved locally.",
      });
    } catch (error) {
      console.error("Error saving draft:", error);
      toast({
        title: "Error",
        description: "Failed to save draft. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleNext = () => {
    saveDraft();
    setCurrentStep(prev => Math.min(prev + 1, 1));
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const clearDraft = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData(initialFormData);
    setCurrentStep(1);
    toast({
      title: "Draft Cleared",
      description: "Form has been reset and draft removed.",
    });
  };

  const stepProps = {
    formData,
    updateFormData,
    onNext: handleNext,
    onPrev: handlePrev,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === 1
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 py-8 my-4">
      <div className="container mx-auto max-w-5xl px-4">

        <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-8">

            <div className="mb-6">
              <Step4SupportFunding {...stepProps} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};