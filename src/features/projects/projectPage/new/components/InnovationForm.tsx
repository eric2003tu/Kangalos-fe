// app/innovation-form/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import ProjectDetails from '../ui/ProjectDetails';
import TeamContacts from '../ui/TeamContacts';
import Classification from '../ui/Classification';
import SupportFunding from '../ui/SupportFunding';
import Documents from '../ui/Documents';
import Review from '../ui/Review';
import ProgressSteps from './ProgressSteps';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  // Project Details
  projectName: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  primarySDG: z.string().min(1, "Primary SDG is required"),
  additionalSDGs: z.array(z.string()).optional(),
  projectTitle: z.string().min(1, "Project title is required"),
  executiveSummary: z.string().optional(),
  
  // Team Contacts
  teamMembers: z.array(z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    role: z.string().min(1, "Role is required")
  })).min(1, "At least one team member is required"),
  primaryPhone: z.string().min(1, "Primary phone is required"),
  primaryEmail: z.string().email("Invalid email").min(1, "Primary email is required"),
  secondaryPhone: z.string().optional(),
  secondaryEmail: z.string().email("Invalid email").optional(),
  
  // Classification
  fieldOfInnovation: z.string().min(1, "Field of innovation is required"),
  expectedIP: z.array(z.string()).min(1, "At least one IP type must be selected"),
  
  // Support & Funding
  pastFunding: z.boolean().optional(),
  futureFundingNeeds: z.boolean().optional(),
  
  // Documents
  boundarySummary: z.instanceof(File, { message: "Boundary summary is required" }),
  businessModel: z.instanceof(File, { message: "Business model is required" }),
  implementationReadings: z.instanceof(File, { message: "Implementation readings are required" }),
  teamProfiles: z.instanceof(File, { message: "Team profiles are required" }),
  additionalDocuments: z.array(z.instanceof(File)).optional(),
  
  // Review
  termsAgreed: z.boolean().refine(val => val, "You must agree to the terms")
});

export default function InnovationForm() {
  const [step, setStep] = useState(1);
  const [draftSaved, setDraftSaved] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      description: "",
      primarySDG: "",
      additionalSDGs: [],
      projectTitle: "",
      executiveSummary: "",
      teamMembers: [],
      primaryPhone: "",
      primaryEmail: "",
      secondaryPhone: "",
      secondaryEmail: "",
      fieldOfInnovation: "",
      expectedIP: [],
      pastFunding: false,
      futureFundingNeeds: false,
      boundarySummary: undefined,
      businessModel: undefined,
      implementationReadings: undefined,
      teamProfiles: undefined,
      additionalDocuments: [],
      termsAgreed: false
    },
    mode: 'onChange'
  });

  // Navigation handlers
  const onNext = async () => {
    if (isNavigating) return;
    setIsNavigating(true);

    try {
      let isValid = true;
      
      // Step-specific validation
      switch(step) {
        case 1:
          isValid = await form.trigger(['projectName', 'primarySDG', 'projectTitle']);
          break;
        case 2:
          isValid = await form.trigger(['teamMembers', 'primaryPhone', 'primaryEmail']);
          break;
        case 3:
          isValid = await form.trigger(['fieldOfInnovation', 'expectedIP']);
          break;
        case 5:
          isValid = await form.trigger([
            'boundarySummary', 
            'businessModel', 
            'implementationReadings', 
            'teamProfiles'
          ]);
          break;
      }

      if (isValid) {
        setStep(prev => Math.min(prev + 1, 6));
      } else {
        const firstError = Object.keys(form.formState.errors)[0];
        if (firstError) {
          document.getElementById(firstError)?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
        toast.error("Please complete all required fields");
      }
    } catch (error) {
      console.error('Navigation error:', error);
      toast.error("An error occurred during validation");
    } finally {
      setIsNavigating(false);
    }
  };

  const onPrevious = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const onSaveDraft = async () => {
    try {
      // Validate current step before saving
      const isValid = await form.trigger();
      if (!isValid) {
        toast.error("Please fix errors before saving");
        return;
      }

      // Here you would typically call your API to save the draft
      setDraftSaved(true);
      toast.success("Draft saved successfully");
      setTimeout(() => setDraftSaved(false), 3000);
    } catch (error) {
      toast.error("Failed to save draft");
      console.error(error);
    }
  };

  const onClearForm = () => {
    form.reset();
    toast.info("Form cleared");
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Form submitted:", values);
      toast.success("Form submitted successfully!");
      router.push('/success');
    } catch (error) {
      toast.error("Submission failed");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prevent accidental navigation with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (form.formState.isDirty) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [form.formState.isDirty]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-15  justify-items-center ">
      <div className="flex flex-row mx-auto bg-[#E3EAF2] rounded-xl shadow-md overflow-hidden">      
        <div className="p-8"><div className="flex items-start gap-4 mb-6">
        <Link href='/dashboard/projectPage' className="mt-1">
          <ArrowLeft size={30} className="h-5 w-5" />
        </Link>
        </div> 

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Innovation Project Form</h1>
          <p className="text-gray-600 mb-8">Document your innovation journey and impact</p>
          </div>
          <ProgressSteps currentStep={step} />
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {step === 1 && <ProjectDetails form={form} />}
              {step === 2 && <TeamContacts form={form} />}
              {step === 3 && <Classification form={form} />}
              {step === 4 && <SupportFunding form={form} />}
              {step === 5 && <Documents form={form} />}
              {step === 6 && <Review form={form} />}
              
              <div className="flex justify-between pt-6 border-t border-gray-200">
                <div className="flex space-x-4">
                  {step > 1 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={onPrevious}
                      disabled={isSubmitting || isNavigating}
                    >
                      Previous
                    </Button>
                  )}
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={onSaveDraft}
                    disabled={isSubmitting || isNavigating || draftSaved}
                  >
                    {draftSaved ? 'Saved!' : 'Save Draft'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={onClearForm}
                    disabled={isSubmitting || isNavigating}
                  >
                    Clear Form
                  </Button>
                </div>
                
                <div>
                  {step < 6 ? (
                    <Button 
                      type="button" 
                      onClick={onNext}
                      disabled={isSubmitting || isNavigating}
                    >
                      {isNavigating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Validating...
                        </>
                      ) : 'Next Step'}
                    </Button>
                  ) : (
                    <Button 
                      type="submit"
                      disabled={isSubmitting || !form.formState.isValid}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : 'Submit'}
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="text-sm text-gray-500 text-center">
                Step {step} of 6
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}