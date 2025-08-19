"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "./FileUpload";
import { LayoutWrapper } from "./LayoutWrapper";
import { HeroSection } from "./HeroSection";
import { ArrowLeft, FileText, Plus, Trash2, X } from "lucide-react";
import Link from "next/link";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Project } from "@/lib/projects";
import { useParams } from "next/navigation";

// Form validation schema
const formSchema = z.object({
  projectName: z.string().min(2, "Project name must be at least 2 characters"),
  projectDescription: z.string().min(20, "Description must be at least 20 characters"),
  businessModel: z.string().min(10, "Please describe your business model"),
  targetMarket: z.string().min(10, "Please describe your target market"),
  fundingNeeds: z.string().min(5, "Please specify funding needs"),
  teamMembers: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email address"),
      role: z.string().min(1, "Role is required")
    })
  ).min(1, "At least one team member is required"),
  documents: z.object({
    required: z.record(z.string()),
    optional: z.instanceof(FileList).optional()
  }),
  terms: z.boolean().refine((val) => val === true, "You must accept the terms"),
});

const TEAM_ROLES = [
  "Founder",
  "Co-Founder",
  "CEO",
  "CTO",
  "CFO",
  "Product Manager",
  "Developer",
  "Designer",
  "Marketing",
  "Other"
];

const REQUIRED_DOCUMENTS = [
  "RDB Certificate", 
  "RURA Certificate",
];

interface TooltipFieldProps {
  label: string;
  tooltip: string;
  required?: boolean;
  children?: React.ReactNode;
  id?: string;
}

const TooltipField = ({ label, tooltip, required, children, id }: TooltipFieldProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label htmlFor={id} className="text-sm font-medium leading-none">
          {label} {required && <span className="text-destructive">*</span>}
        </label>
        <div className="text-muted-foreground" title={tooltip}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </div>
      </div>
      {children}
    </div>
  );
};

export function FinalStartup() {
      const params = useParams();
      const router = useRouter();
      const projectId = params?.id ? parseInt(params.id as string) : null;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", email: "", role: "" });
  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      projectDescription: "",
      businessModel: "",
      targetMarket: "",
      fundingNeeds: "",
      teamMembers: [],
      documents: {
        required: {},
        optional: undefined
      },
      terms: false,
    },
  });

  const { watch, setValue, formState: { errors } } = form;
  const documents = watch("documents");



  const removeRequiredFile = (docType: string) => {
    const { [docType]: _removed, ...rest } = documents.required;
    setValue("documents", {
      ...documents,
      required: rest
    });
  };

  const isValidFile = (file: File) => {
    const allowedExtensions = [".pdf", ".doc", ".docx", ".ppt", ".pptx"];
    const fileName = file.name.toLowerCase();
    return allowedExtensions.some(ext => fileName.endsWith(ext));
  };

  const handleFileUpload = (docType: string, file: File) => {
    if (!isValidFile(file)) {
      alert("Please upload a PDF, DOCX, or PPT file");
      return;
    }

    setUploadingFiles(prev => new Set(prev).add(docType));
    
    // Simulate upload
    setTimeout(() => {
      setValue("documents", {
        ...documents,
        required: {
          ...documents.required,
          [docType]: file.name
        }
      });
      setUploadingFiles(prev => {
        const newSet = new Set(prev);
        newSet.delete(docType);
        return newSet;
      });
    }, 1000);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    console.log("Form values:", values);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    alert("Project startup form submitted successfully!");
  };

  return (
    <LayoutWrapper className="py-12 bg-[#E3EAF2] w-full my-4 rounded-lg">
      <div className="relative mb-8">
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
          <Link href={`/dashboard/projectPage/${projectId}`}>
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
        </div>
        
        <div className="text-center">
          <HeroSection
            title="Project Startup Application"
            subtitle="Complete the form to register your new project"
          />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            {/* Business Details Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Project Details</h3>
              
              <FormField
                control={form.control}
                name="businessModel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Model *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your revenue model"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="targetMarket"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Market *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Who are your target customers?"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>


            {/* Required Documents Section */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-foreground flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Required Documents ({Object.keys(documents.required).length}/{REQUIRED_DOCUMENTS.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {REQUIRED_DOCUMENTS.map((docType) => (
                    <div key={docType} className="border border-border rounded-lg p-4">
                      <TooltipField
                        label={docType}
                        tooltip={`Upload your ${docType.toLowerCase()} document. Accepted formats: PDF, DOCX, PPT`}
                        id={`required-${docType}`}
                      />
                      
                      {documents.required[docType] ? (
                        <div className="mt-2 flex items-center justify-between bg-muted/50 p-3 rounded">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">{documents.required[docType]}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRequiredFile(docType)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="mt-2">
                          <Input
                            type="file"
                            accept=".pdf,.docx,.doc,.pptx,.ppt"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleFileUpload(docType, file);
                              }
                            }}
                            disabled={uploadingFiles.has(docType)}
                            className="cursor-pointer"
                          />
                          {uploadingFiles.has(docType) && (
                            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                              Uploading...
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Additional Documents Section */}
            <div className="space-y-6 md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900">Supporting Documents</h3>
              
              <FormField
                control={form.control}
                name="documents.optional"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Additional Documents (PDF, DOC, PPT, XLS)</FormLabel>
                    <FormControl>
                      <FileUpload
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                        onChange={field.onChange}
                        multiple
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Terms Agreement Section */}
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-3 space-y-0">
                    <FormControl>
                      <input
                        type="checkbox"
                        className="h-4 w-4 mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to the terms and conditions *
                      </FormLabel>
                      <p className="text-sm text-gray-500">
                        By submitting this form, you confirm that all information provided is accurate.
                      </p>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" size="lg">
              Save Draft
            </Button>
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : "Submit Application"}
            </Button>
          </div>
        </form>
      </Form>
    </LayoutWrapper>
  );
}