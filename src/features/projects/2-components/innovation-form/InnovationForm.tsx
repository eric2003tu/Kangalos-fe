import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FormData } from "./types";
import { ProgressStepper } from "./ProgressStepper";
import { Step1ProjectDetails } from "./Step1ProjectDetails";
import { Step2TeamContacts } from "./Step2TeamContacts";
import { Step3InnovationClassification } from "./Step2InnovationClassification";
import { Step4SupportFunding } from "./Step4SupportFunding";
import { Step5DocumentUpload } from "./Step5DocumentUpload";
import { ReviewSubmit } from "./ReviewSubmit";
import { ArrowLeft, Save } from "lucide-react";
import { addProject } from "@/lib/projectStorage";
import Link from "next/link";

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

const stepTitles = ["Project Details", "Classification","Team & Contacts", "Support & Funding", "Documents", "Review"];

interface InnovationFormProps {
  onSubmitted?: () => void;
}

export const InnovationForm = ({ onSubmitted }: InnovationFormProps) => {
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
    setCurrentStep(prev => Math.min(prev + 1, 6));
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    try {
      addProject(formData);
      localStorage.removeItem(STORAGE_KEY);

      toast({
        title: "Form Submitted Successfully!",
        description: "Your innovation form has been saved to local storage.",
      });

      setFormData(initialFormData);
      setCurrentStep(1);
      onSubmitted?.();
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    }
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

  const renderStep = () => {
    const stepProps = {
      formData,
      updateFormData,
      onNext: handleNext,
      onPrev: handlePrev,
      isFirstStep: currentStep === 1,
      isLastStep: currentStep === 5
    };

    switch (currentStep) {
      case 1:
        return <Step1ProjectDetails {...stepProps} />;
      case 2:
        return <Step3InnovationClassification {...stepProps} />;
      case 3:
        return <Step2TeamContacts {...stepProps} />;
      case 4:
        return <Step4SupportFunding {...stepProps} />;
      case 5:
        return <Step5DocumentUpload {...stepProps} />;
      case 6:
        return <ReviewSubmit formData={formData} onSubmit={handleSubmit} onPrev={handlePrev} />;
      default:
        return <Step1ProjectDetails {...stepProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 py-8">
      <div className="container mx-auto max-w-5xl px-4">

        <div className="relative mb-8">
          {/* Left Icon */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <Link href="/dashboard/projectPage">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        
          {/* Centered Text */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Finding Fnders and Supports
            </h2>
            <p className="text-muted-foreground">
              Document your innovation journey and impact
            </p>
          </div>
        </div>
        <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-8">
            <ProgressStepper
              currentStep={currentStep}
              stepTitles={stepTitles}
            />

            <div className="mb-6">
              {renderStep()}
            </div>

            {currentStep < 6 && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={saveDraft}
                    className="flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Draft
                  </Button>
                  <Button
                    variant="outline"
                    onClick={clearDraft}
                    className="text-destructive hover:text-destructive"
                  >
                    Clear Form
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Step {currentStep} of {stepTitles.length}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};