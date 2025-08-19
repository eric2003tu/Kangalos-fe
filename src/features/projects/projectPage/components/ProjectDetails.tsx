import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft, FileText, Users, Layers, DollarSign, Mail, Phone, Calendar, Hash } from "lucide-react";

interface ProjectDetailsProps {
  project: {
    id: number;
    title: string;
    description: string;
    category: string;
    status: "Previously funded" | "New";
    amount: number;
    university: string;
    date: string;
    // Project Details
    primarySDG: string;
    year: number;
    sdgSolutions: Record<string, string>; // ✅ Changed from sdgSolution to sdgSolutions
    additionalSDGs: string[];
    executiveSummary: string;
    // Team & Contacts
    teamMembers: {
      name: string;
      email: string;
      role: string;
    }[];
    contacts: {
      primaryPhone: string;
      primaryEmail: string;
      secondaryPhone?: string;
      secondaryEmail?: string;
    };
    // Classification
    fieldOfInnovation: string;
    subField: string;
    intellectualProperty: {
      type: string;
      status: string;
    }[];
    // Support & Funding
    pastFunding: {
      received: boolean;
      funders: string[];
      supportTypes: string[];
      yearBegan: number;
      duration: number;
      amount: number;
    };
    futureFundingNeeded: boolean;
    // Documents
    documents: {
      type: string;
      name: string;
      url: string;
    }[];
  };
  onBack?: () => void;
}

export function ProjectDetails({ project, onBack }: ProjectDetailsProps) {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header with Back Button */}
      <div className="flex items-start gap-4 mb-6">
        <Link href="/dashboard/projectPage">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="w-full">
        <div className="flex justify-between items-center w-full">
      <h1 className="text-2xl font-bold">{project.title}</h1>
      <div className="flex space-x-4">
        <Link href={`/dashboard/projectPage/${project.id}/startup`}>
        <Button>
          Startup
        </Button>
        </Link>
        <Link href={`/dashboard/projectPage/${project.id}/find-funder`}>
        <Button>
          Find Funder
        </Button>
        </Link>        <Link href={`/dashboard/projectPage/${project.id}/report`}>
        <Button>
          Report 
        </Button>
        </Link>
        <Link href={`/dashboard/projectPage/${project.id}/provide-funds`}>
        <Button>
          Provide Funds
        </Button>
        </Link>
      </div>
           </div>

          <div className="flex items-center gap-3 mt-2">
            <Badge variant={project.status === "New" ? "default" : "secondary"}>
              {project.status}
            </Badge>
            {/* <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Hash className="h-4 w-4" />
              <span>ID: {project.id}</span>
            </div> */}
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{project.date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Core Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span>Project Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium">{project.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">University</p>
                  <p className="font-medium">{project.university}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Year</p>
                  <p className="font-medium">{project.year}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Funding Amount</p>
                  <p className="font-medium">${project.amount.toLocaleString()}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Primary SDG</p>
                <Badge variant="outline" className="mt-1">
                  {project.primarySDG}
                </Badge>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">SDG Solution</p>
                 <p className="mt-1">{Object.values(project.sdgSolutions).join(', ')}</p>
              </div>

              {project.additionalSDGs.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground">Additional SDGs</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.additionalSDGs.map((sdg) => (
                      <Badge key={sdg} variant="outline">{sdg}</Badge>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-sm text-muted-foreground">Executive Summary</p>
                <p className="mt-1 whitespace-pre-line">{project.executiveSummary}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Full Description</p>
                <p className="mt-1 whitespace-pre-line">{project.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Team & Contacts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>Team & Contacts</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {project.teamMembers.map((member, i) => (
                  <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                    <Badge variant="outline">{member.role}</Badge>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Phone className="h-4 w-4" /> Primary Phone
                  </p>
                  <p className="font-medium">{project.contacts.primaryPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Mail className="h-4 w-4" /> Primary Email
                  </p>
                  <p className="font-medium">{project.contacts.primaryEmail}</p>
                </div>
                {project.contacts.secondaryPhone && (
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Phone className="h-4 w-4" /> Secondary Phone
                    </p>
                    <p className="font-medium">{project.contacts.secondaryPhone}</p>
                  </div>
                )}
                {project.contacts.secondaryEmail && (
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Mail className="h-4 w-4" /> Secondary Email
                    </p>
                    <p className="font-medium">{project.contacts.secondaryEmail}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Additional Info */}
        <div className="space-y-6">
          {/* Classification */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" />
                <span>Classification</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Field of Innovation</p>
                <p className="font-medium">{project.fieldOfInnovation}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sub-field</p>
                <p className="font-medium">{project.subField}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Intellectual Property</p>
                <div className="mt-2 space-y-2">
                  {project.intellectualProperty.map((ip, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span>{ip.type}</span>
                      <Badge variant="outline">{ip.status}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support & Funding */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                <span>Support & Funding</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
<div>
  <p className="text-sm text-muted-foreground">Past Funding</p>
  {project.pastFunding.received ? (
    <div className="mt-2 space-y-2">
      <p className="font-medium">
        {project.pastFunding.amount.toLocaleString()} RWF
      </p>
      <div className="flex flex-wrap gap-1">
        {project.pastFunding.funders?.map((funder, i) => (
          <Badge key={i} variant="outline">{funder}</Badge>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        {project.pastFunding.yearBegan} • {project.pastFunding.duration} years
      </p>
    </div>
  ) : (
    <p className="text-sm text-muted-foreground mt-1">No past funding received</p>
  )}
</div>
              <div>
                <p className="text-sm text-muted-foreground">Future Funding</p>
                <p className="font-medium mt-1">
                  {project.futureFundingNeeded ? "Required" : "Not needed"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span>Documents ({project.documents.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {project.documents.map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-muted rounded">
                  <div>
                    <p className="text-sm font-medium">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.type}</p>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}