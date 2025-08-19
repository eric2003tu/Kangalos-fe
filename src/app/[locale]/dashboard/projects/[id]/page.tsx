'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProjectById } from "@/lib/projectStorage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, DollarSign, Users, Lightbulb, Target, FileText } from "lucide-react";
import Link from "next/link";

export default function ProjectIdPage() {
  const params = useParams<{ id: string; }>();
  const router = useRouter();
  const project = getProjectById(params.id);

  if (!project) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Project Not Found</h1>
          <p className="text-muted-foreground">The project you&apos;re looking for doesn&apos;t exist.</p>
          <Button asChild>
            <Link href="/dashboard/projects">Back to Projects</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{project.projectName}</h1>
          <p className="text-muted-foreground mt-1">
            Created {new Date(project.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="default" className="w-full">
          Initiate Startup
        </Button>
        <Button variant="outline" className="w-full">
          Request Funding
        </Button>
        <Button variant="outline" className="w-full">
          Add Report
        </Button>
        <Button variant="secondary" className="w-full">
          Edit Project
        </Button>
      </div>

      {/* Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Project Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{project.description}</p>
          </div>

          {project.executiveSummary && (
            <div>
              <h3 className="font-semibold mb-2">Executive Summary</h3>
              <p className="text-muted-foreground">{project.executiveSummary}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Project Title</h3>
              <p className="text-muted-foreground">{project.projectTitle || "N/A"}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Year</h3>
              <p className="text-muted-foreground">{project.year || "N/A"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Innovation Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Innovation Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Field of Innovation</h3>
              <Badge variant="secondary">{project.fieldOfInnovation || "N/A"}</Badge>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Innovation Subfield</h3>
              <Badge variant="outline">{project.innovationSubfield || "N/A"}</Badge>
            </div>
          </div>

          {project.expectedIP && project.expectedIP.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Expected Intellectual Property</h3>
              <div className="flex flex-wrap gap-2">
                {project.expectedIP.map((ip, index) => (
                  <Badge key={index} variant="outline">{ip}</Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* SDG Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Sustainable Development Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Primary SDG</h3>
            <Badge className="mb-2">{project.primarySDG}</Badge>
            {project.primarySDGSolution && (
              <p className="text-sm text-muted-foreground">{project.primarySDGSolution}</p>
            )}
          </div>

          {project.additionalSDGs && project.additionalSDGs.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Additional SDGs</h3>
              <div className="space-y-2">
                {project.additionalSDGs.map((sdg, index) => (
                  <div key={index}>
                    <Badge variant="secondary" className="mb-1">{sdg}</Badge>
                    {project.additionalSDGSolutions[sdg] && (
                      <p className="text-sm text-muted-foreground ml-2">
                        {project.additionalSDGSolutions[sdg]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          {project.teamMembers && project.teamMembers.length > 0 ? (
            <div className="space-y-3">
              {project.teamMembers.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                  <Badge variant="outline">{member.role}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No team members added</p>
          )}
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Primary Contact</h3>
              <div className="space-y-1 text-sm">
                {project.generalContact?.primaryEmail && (
                  <p>Email: {project.generalContact.primaryEmail}</p>
                )}
                {project.generalContact?.primaryPhone && (
                  <p>Phone: {project.generalContact.primaryPhone}</p>
                )}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Secondary Contact</h3>
              <div className="space-y-1 text-sm">
                {project.generalContact?.secondaryEmail && (
                  <p>Email: {project.generalContact.secondaryEmail}</p>
                )}
                {project.generalContact?.secondaryPhone && (
                  <p>Phone: {project.generalContact.secondaryPhone}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Funding Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Funding Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Past Funding */}
          <div>
            <h3 className="font-semibold mb-2">Past Funding</h3>
            {project.pastFunding?.hasPastFunding ? (
              <div className="space-y-2">
                <Badge className="bg-green-100 text-green-800">Has Past Funding</Badge>
                {project.pastFunding.fundingAmount && (
                  <p className="text-sm">Amount: {project.pastFunding.fundingAmount}</p>
                )}
                {project.pastFunding.funders && project.pastFunding.funders.length > 0 && (
                  <div>
                    <p className="text-sm font-medium">Funders:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.pastFunding.funders.map((funder, index) => (
                        <Badge key={index} variant="outline" className="text-xs">{funder}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {project.pastFunding.supportTypes && project.pastFunding.supportTypes.length > 0 && (
                  <div>
                    <p className="text-sm font-medium">Support Types:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.pastFunding.supportTypes.map((type, index) => (
                        <Badge key={index} variant="outline" className="text-xs">{type}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Badge variant="secondary">No Past Funding</Badge>
            )}
          </div>

          <Separator />

          {/* Future Funding */}
          <div>
            <h3 className="font-semibold mb-2">Future Funding Needs</h3>
            {project.futureFunding?.needsFunding ? (
              <div className="space-y-2">
                <Badge className="bg-blue-100 text-blue-800">Needs Funding</Badge>
                {project.futureFunding.fundingTypes &&
                  project.futureFunding.fundingTypes.length > 0 && (
                    <p className="text-sm">
                      Type: {project.futureFunding.fundingTypes.join(", ")}
                    </p>
                  )}
                {project.futureFunding.monetaryAmount && (
                  <p className="text-sm">Amount: {project.futureFunding.monetaryAmount}</p>
                )}
                {project.futureFunding.expectedFunder && (
                  <p className="text-sm">Expected Funder: {project.futureFunding.expectedFunder}</p>
                )}
              </div>
            ) : (
              <Badge variant="secondary">No Funding Needed</Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Metadata */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Project Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Created:</p>
              <p className="text-muted-foreground">
                {new Date(project.createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="font-medium">Last Updated:</p>
              <p className="text-muted-foreground">
                {new Date(project.updatedAt).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="font-medium">Project ID:</p>
              <p className="text-muted-foreground font-mono">{project.id}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-center pt-4">
        <Button asChild>
          <Link href="/dashboard/projects">Back to Projects</Link>
        </Button>
      </div>
    </div>
  );
}
