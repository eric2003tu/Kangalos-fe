"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DollarSign, ArrowLeft, Info, FileText, Handshake, Calendar, Mail, Upload, File } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { useState } from "react";
import { FundingTypeSelector } from "./ui/FundingTypeSelector";
import { useRouter } from "next/navigation";
import { Project } from "@/lib/projects";
import { useParams } from "next/navigation";

const CURRENCIES = [
  { value: "RWF", label: "Rwandan Franc (RWF)" },
  { value: "USD", label: "US Dollar (USD)" },
  { value: "EUR", label: "Euro (EUR)" },
  { value: "GBP", label: "British Pound (GBP)" }
];

const FUNDING_TYPES = [
  { value: "grant", label: "Grant", icon: <FileText className="w-4 h-4 mr-2" /> },
  { value: "equity", label: "Equity Investment", icon: <Handshake className="w-4 h-4 mr-2" /> },
  { value: "loan", label: "Loan", icon: <DollarSign className="w-4 h-4 mr-2" /> },
  { value: "convertible", label: "Convertible Note", icon: <FileText className="w-4 h-4 mr-2" /> },
  { value: "inkind", label: "In-kind Support", icon: <Handshake className="w-4 h-4 mr-2" /> }
];

const DURATION_OPTIONS = [
  { value: "onetime", label: "One-time", icon: <Calendar className="w-4 h-4 mr-2" /> },
  { value: "3months", label: "3 Months", icon: <Calendar className="w-4 h-4 mr-2" /> },
  { value: "6months", label: "6 Months", icon: <Calendar className="w-4 h-4 mr-2" /> },
  { value: "1year", label: "1 Year", icon: <Calendar className="w-4 h-4 mr-2" /> },
  { value: "2years", label: "2 Years", icon: <Calendar className="w-4 h-4 mr-2" /> },
  { value: "3plus", label: "3+ Years", icon: <Calendar className="w-4 h-4 mr-2" /> }
];

export function ProvideFunds() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const params = useParams();
    const router = useRouter();
    const projectId = params?.id ? parseInt(params.id as string) : null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full grid grid-cols-1 justify-items-center mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4 w-full">
        <Link href={`/dashboard/projectPage/${projectId}`}>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Provide Funding</h1>
          <p className="text-sm text-muted-foreground">Support innovative projects with your contribution</p>
        </div>
      </div>

      <Card className="border-0 shadow-sm w-full">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg">Project Summary</CardTitle>
              <CardDescription>Details about the project you're supporting</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <h3 className="font-medium text-lg">Sustainable Energy Initiative</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                University of Rwanda
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5" />
                <span>5,000,000 RWF requested</span>
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Developing affordable solar solutions for rural communities...
            </p>
          </div>
        </CardContent>
      </Card>

      <form className="space-y-6 w-full">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg">Funding Details</CardTitle>
                <CardDescription>Specify your funding offer details</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <FundingTypeSelector/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="space-y-2">
                <Label htmlFor="duration">Funding Duration</Label>
                <Select>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {DURATION_OPTIONS.map((duration) => (
                      <SelectItem key={duration.value} value={duration.value}>
                        <div className="flex items-center">
                          {duration.icon}
                          {duration.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="conditions">Special Conditions</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Any requirements or conditions for this funding</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Textarea
                id="conditions"
                placeholder="E.g., Quarterly progress reports, milestone-based disbursement..."
                className="min-h-[100px]"
              />
            </div>

            {/* Document Upload Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label>Supporting Documents (Optional)</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Upload any additional documents related to your funding offer</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <Label
                    htmlFor="document-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, DOCX, or XLSX (Max. 10MB each)
                      </p>
                    </div>
                    <Input
                      id="document-upload"
                      type="file"
                      className="hidden"
                      multiple
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.xls,.xlsx"
                    />
                  </Label>
                </div>
                
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Uploaded Files:</h4>
                    <ul className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <li key={index} className="flex items-center justify-between p-2 border rounded-md">
                          <div className="flex items-center gap-2">
                            <File className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{file.name}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-600"
                          >
                            Remove
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg">Contact Information</CardTitle>
                <CardDescription>How the project team can reach you</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any other information you'd like to share with the project team..."
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button size="lg" className="w-full sm:w-auto">
            Submit Funding Offer
          </Button>
        </div>
      </form>
    </div>
  );
}