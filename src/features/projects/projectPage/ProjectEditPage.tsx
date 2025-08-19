"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Trash2, FileText, Users, Layers, DollarSign, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Project } from "@/lib/projects";
import { useParams } from "next/navigation";

export default function ProjectEditPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params?.id ? parseInt(params.id as string) : null;
  
  // Get project data from URL params or sample data
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [newTeamMember, setNewTeamMember] = useState({ name: "", email: "", role: "" });
  const [newDocument, setNewDocument] = useState({ type: "", name: "", url: "" });
  const [newSdg, setNewSdg] = useState("");
  const [newFunder, setNewFunder] = useState("");
  const [newIp, setNewIp] = useState({ type: "", status: "" });

  useEffect(() => {
    if (!projectId) {
      setLoading(false);
      return;
    }

    // In a real app, you would fetch the project data here
    // For now, we'll use the sample data
    const foundProject = sampleProjects.find(p => p.id === projectId);
    setProject(foundProject || null);
    setLoading(false);
  }, [projectId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (project) {
      setProject(prev => ({ ...prev!, [name]: value }));
    }
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    if (project) {
      setProject(prev => ({
        ...prev!,
        [parent]: {
          ...((prev![parent as keyof Project] ?? {}) as object),
          [field]: value
        }
      }));
    }
  };

  const handleArrayChange = (arrayName: string, index: number, field: string, value: string) => {
    if (project) {
      setProject(prev => {
        const newArray = [...prev![arrayName as keyof Project] as any[]];
        newArray[index] = { ...newArray[index], [field]: value };
        return { ...prev!, [arrayName]: newArray };
      });
    }
  };

  const addTeamMember = () => {
    if (project && newTeamMember.name && newTeamMember.email) {
      setProject(prev => ({
        ...prev!,
        teamMembers: [...prev!.teamMembers, newTeamMember]
      }));
      setNewTeamMember({ name: "", email: "", role: "" });
    }
  };

  const removeTeamMember = (index: number) => {
    if (project) {
      setProject(prev => ({
        ...prev!,
        teamMembers: prev!.teamMembers.filter((_, i) => i !== index)
      }));
    }
  };

  const addDocument = () => {
    if (project && newDocument.name && newDocument.type) {
      setProject(prev => ({
        ...prev!,
        documents: [...prev!.documents, newDocument]
      }));
      setNewDocument({ type: "", name: "", url: "" });
    }
  };

  const removeDocument = (index: number) => {
    if (project) {
      setProject(prev => ({
        ...prev!,
        documents: prev!.documents.filter((_, i) => i !== index)
      }));
    }
  };

  const addSdg = () => {
    if (project && newSdg) {
      setProject(prev => ({
        ...prev!,
        additionalSDGs: [...prev!.additionalSDGs, newSdg]
      }));
      setNewSdg("");
    }
  };

  const removeSdg = (index: number) => {
    if (project) {
      setProject(prev => ({
        ...prev!,
        additionalSDGs: prev!.additionalSDGs.filter((_, i) => i !== index)
      }));
    }
  };

  const addFunder = () => {
    if (project && newFunder) {
      setProject(prev => ({
        ...prev!,
        pastFunding: {
          ...prev!.pastFunding,
          funders: [...prev!.pastFunding.funders, newFunder]
        }
      }));
      setNewFunder("");
    }
  };

  const removeFunder = (index: number) => {
    if (project) {
      setProject(prev => ({
        ...prev!,
        pastFunding: {
          ...prev!.pastFunding,
          funders: prev!.pastFunding.funders.filter((_, i) => i !== index)
        }
      }));
    }
  };

  const addIp = () => {
    if (project && newIp.type) {
      setProject(prev => ({
        ...prev!,
        intellectualProperty: [...prev!.intellectualProperty, newIp]
      }));
      setNewIp({ type: "", status: "" });
    }
  };

  const removeIp = (index: number) => {
    if (project) {
      setProject(prev => ({
        ...prev!,
        intellectualProperty: prev!.intellectualProperty.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;
    
    // In a real app, you would save the changes here
    console.log("Project updated:", project);
    alert("Project updated successfully!");
    router.push(`/dashboard/projectPage/${project.id}`);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 flex justify-center items-center h-64">
        <p>Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/dashboard/projectPage">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Project Not Found</h1>
        </div>
        <p>The requested project could not be found.</p>
        <div className="mt-4">
          <Link href="/dashboard/projectPage">
            <Button variant="outline">Back to Projects</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href={`/dashboard/projectPage/${project.id}`}>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Edit Project</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Core Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <span>Basic Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div>
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={project.title}
                    onChange={handleChange}
                    placeholder="Enter project title"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={project.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe your project"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      name="category"
                      value={project.category}
                      onChange={handleChange}
                      placeholder="Project category"
                    />
                  </div>
                  <div>
                    <Label htmlFor="university">University</Label>
                    <Input
                      id="university"
                      name="university"
                      value={project.university}
                      onChange={handleChange}
                      placeholder="University name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      name="status"
                      value={project.status}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="New">New</option>
                      <option value="Previously funded">Previously Funded</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="amount">Funding Amount ($)</Label>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      value={project.amount}
                      onChange={handleChange}
                      placeholder="Amount"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="executiveSummary">Executive Summary</Label>
                  <Textarea
                    id="executiveSummary"
                    name="executiveSummary"
                    value={project.executiveSummary}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Executive summary of your project"
                  />
                </div>
              </CardContent>
            </Card>

            {/* SDG Information */}
            <Card>
              <CardHeader>
                <CardTitle>Sustainable Development Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="primarySDG">Primary SDG</Label>
                  <Input
                    id="primarySDG"
                    name="primarySDG"
                    value={project.primarySDG}
                    onChange={handleChange}
                    placeholder="e.g. 1. No Poverty"
                  />
                </div>

                <div>
                  <Label>SDG Solutions</Label>
                  {Object.entries(project.sdgSolutions).map(([sdg, solution], idx) => (
                    <div key={idx} className="mb-2">
                      <div className="flex gap-2">
                        <Input
                          value={sdg}
                          onChange={(e) => {
                            const newSolutions = { ...project.sdgSolutions };
                            delete newSolutions[sdg];
                            newSolutions[e.target.value] = solution;
                            setProject(prev => ({ ...prev!, sdgSolutions: newSolutions }));
                          }}
                          placeholder="SDG Number"
                        />
                        <Input
                          value={solution}
                          onChange={(e) => {
                            setProject(prev => ({
                              ...prev!,
                              sdgSolutions: { ...prev!.sdgSolutions, [sdg]: e.target.value }
                            }));
                          }}
                          placeholder="Solution description"
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => {
                      setProject(prev => ({
                        ...prev!,
                        sdgSolutions: { ...prev!.sdgSolutions, "": "" }
                      }));
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add SDG Solution
                  </Button>
                </div>

                <div>
                  <Label>Additional SDGs</Label>
                  <div className="space-y-2 mb-2">
                    {project.additionalSDGs.map((sdg, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={sdg}
                          onChange={(e) => {
                            const newSdgs = [...project.additionalSDGs];
                            newSdgs[index] = e.target.value;
                            setProject(prev => ({ ...prev!, additionalSDGs: newSdgs }));
                          }}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSdg(index)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newSdg}
                      onChange={(e) => setNewSdg(e.target.value)}
                      placeholder="e.g. 2. Zero Hunger"
                    />
                    <Button type="button" onClick={addSdg}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
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
                  {project.teamMembers.map((member, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 p-3 border rounded-lg">
                      <Input
                        value={member.name}
                        onChange={(e) => handleArrayChange("teamMembers", index, "name", e.target.value)}
                        placeholder="Name"
                      />
                      <Input
                        value={member.email}
                        onChange={(e) => handleArrayChange("teamMembers", index, "email", e.target.value)}
                        placeholder="Email"
                        type="email"
                      />
                      <div className="flex gap-2">
                        <Input
                          value={member.role}
                          onChange={(e) => handleArrayChange("teamMembers", index, "role", e.target.value)}
                          placeholder="Role"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeTeamMember(index)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <Input
                    value={newTeamMember.name}
                    onChange={(e) => setNewTeamMember({ ...newTeamMember, name: e.target.value })}
                    placeholder="Name"
                  />
                  <Input
                    value={newTeamMember.email}
                    onChange={(e) => setNewTeamMember({ ...newTeamMember, email: e.target.value })}
                    placeholder="Email"
                    type="email"
                  />
                  <div className="flex gap-2">
                    <Input
                      value={newTeamMember.role}
                      onChange={(e) => setNewTeamMember({ ...newTeamMember, role: e.target.value })}
                      placeholder="Role"
                    />
                    <Button type="button" onClick={addTeamMember}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div>
                    <Label htmlFor="primaryPhone">Primary Phone</Label>
                    <Input
                      id="primaryPhone"
                      value={project.contacts.primaryPhone}
                      onChange={(e) => handleNestedChange("contacts", "primaryPhone", e.target.value)}
                      placeholder="Phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="primaryEmail">Primary Email</Label>
                    <Input
                      id="primaryEmail"
                      value={project.contacts.primaryEmail}
                      onChange={(e) => handleNestedChange("contacts", "primaryEmail", e.target.value)}
                      placeholder="Email"
                      type="email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="secondaryPhone">Secondary Phone</Label>
                    <Input
                      id="secondaryPhone"
                      value={project.contacts.secondaryPhone || ""}
                      onChange={(e) => handleNestedChange("contacts", "secondaryPhone", e.target.value)}
                      placeholder="Secondary phone"
                    />
                  </div>
                  <div>
                    <Label htmlFor="secondaryEmail">Secondary Email</Label>
                    <Input
                      id="secondaryEmail"
                      value={project.contacts.secondaryEmail || ""}
                      onChange={(e) => handleNestedChange("contacts", "secondaryEmail", e.target.value)}
                      placeholder="Secondary email"
                      type="email"
                    />
                  </div>
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
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="fieldOfInnovation">Field of Innovation</Label>
                  <Input
                    id="fieldOfInnovation"
                    name="fieldOfInnovation"
                    value={project.fieldOfInnovation}
                    onChange={handleChange}
                    placeholder="Field of innovation"
                  />
                </div>
                <div>
                  <Label htmlFor="subField">Sub-field</Label>
                  <Input
                    id="subField"
                    name="subField"
                    value={project.subField}
                    onChange={handleChange}
                    placeholder="Sub-field"
                  />
                </div>
                <div>
                  <Label>Intellectual Property</Label>
                  <div className="space-y-2 mb-2">
                    {project.intellectualProperty.map((ip, index) => (
                      <div key={index} className="grid grid-cols-2 gap-2">
                        <Input
                          value={ip.type}
                          onChange={(e) => handleArrayChange("intellectualProperty", index, "type", e.target.value)}
                          placeholder="Type"
                        />
                        <div className="flex gap-2">
                          <Input
                            value={ip.status}
                            onChange={(e) => handleArrayChange("intellectualProperty", index, "status", e.target.value)}
                            placeholder="Status"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeIp(index)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      value={newIp.type}
                      onChange={(e) => setNewIp({ ...newIp, type: e.target.value })}
                      placeholder="Type"
                    />
                    <div className="flex gap-2">
                      <Input
                        value={newIp.status}
                        onChange={(e) => setNewIp({ ...newIp, status: e.target.value })}
                        placeholder="Status"
                      />
                      <Button type="button" onClick={addIp}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
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
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="pastFundingReceived"
                    checked={project.pastFunding.received}
                    onChange={(e) => handleNestedChange("pastFunding", "received", e.target.checked)}
                  />
                  <Label htmlFor="pastFundingReceived">Received Past Funding</Label>
                </div>

                {project.pastFunding.received && (
                  <>
                    <div>
                      <Label>Funders</Label>
                      <div className="space-y-2 mb-2">
                        {project.pastFunding.funders.map((funder, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={funder}
                              onChange={(e) => {
                                const newFunders = [...project.pastFunding.funders];
                                newFunders[index] = e.target.value;
                                handleNestedChange("pastFunding", "funders", newFunders);
                              }}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFunder(index)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={newFunder}
                          onChange={(e) => setNewFunder(e.target.value)}
                          placeholder="Funder name"
                        />
                        <Button type="button" onClick={addFunder}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="yearBegan">Year Began</Label>
                        <Input
                          id="yearBegan"
                          type="number"
                          value={project.pastFunding.yearBegan}
                          onChange={(e) => handleNestedChange("pastFunding", "yearBegan", parseInt(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="duration">Duration (years)</Label>
                        <Input
                          id="duration"
                          type="number"
                          value={project.pastFunding.duration}
                          onChange={(e) => handleNestedChange("pastFunding", "duration", parseInt(e.target.value))}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="pastFundingAmount">Amount</Label>
                      <Input
                        id="pastFundingAmount"
                        type="number"
                        value={project.pastFunding.amount}
                        onChange={(e) => handleNestedChange("pastFunding", "amount", parseInt(e.target.value))}
                      />
                    </div>
                  </>
                )}

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="futureFundingNeeded"
                    checked={project.futureFundingNeeded}
                    onChange={(e) => setProject(prev => ({ ...prev!, futureFundingNeeded: e.target.checked }))}
                  />
                  <Label htmlFor="futureFundingNeeded">Future Funding Needed</Label>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <span>Documents</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {project.documents.map((doc, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <Input
                        value={doc.type}
                        onChange={(e) => handleArrayChange("documents", index, "type", e.target.value)}
                        placeholder="Type"
                      />
                      <div className="flex gap-2">
                        <Input
                          value={doc.name}
                          onChange={(e) => handleArrayChange("documents", index, "name", e.target.value)}
                          placeholder="Name"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeDocument(index)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Input
                    value={newDocument.type}
                    onChange={(e) => setNewDocument({ ...newDocument, type: e.target.value })}
                    placeholder="Type"
                  />
                  <div className="flex gap-2">
                    <Input
                      value={newDocument.name}
                      onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                      placeholder="Name"
                    />
                    <Button type="button" onClick={addDocument}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link href={`/dashboard/projectPage/${project.id}`}>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}

// Sample data (would normally come from props or API)
const sampleProjects: Project[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Innovation Project ${i + 1}`,
  description: `This project demonstrates innovative solutions in ${["Agriculture", "Health", "ICT", "Energy"][i % 4]} developed by university students`,
  category: ["Agriculture & Food Security", "Health & Medical", "ICT & Digital Solutions", "Energy & Environment"][i % 4],
  status: i % 3 === 0 ? "New" : "Previously funded",
  amount: 5000 + (i * 1000),
  university: ["UR", "KIST", "INES", "CMU"][i % 4],
  date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
  
  // Project Details
  primarySDG: `${(i % 17) + 1}. ${["No Poverty", "Zero Hunger", "Good Health", "Quality Education"][i % 4]}`,
  year: 2023 - (i % 3),
  sdgSolutions: {
    [`${(i % 17) + 1}`]: `Solution details for SDG ${(i % 17) + 1}`
  },
  additionalSDGs: [
    `${(i % 17) + 2}. Additional SDG 1`,
    `${(i % 17) + 3}. Additional SDG 2`
  ],
  executiveSummary: `Executive summary for project ${i + 1} demonstrating impact and innovation`,
  
  // Team & Contacts
  teamMembers: [
    {
      name: `Member ${i + 1}`,
      email: `member${i + 1}@university.edu`,
      role: ["Lead", "Researcher", "Developer", "Manager"][i % 4]
    }
  ],
  contacts: {
    primaryPhone: `+25078${Math.floor(100000 + Math.random() * 900000)}`,
    primaryEmail: `contact${i + 1}@university.edu`
  },
  
  // Classification
  fieldOfInnovation: ["Agriculture", "Health", "ICT", "Energy"][i % 4],
  subField: ["Subfield A", "Subfield B", "Subfield C", "Subfield D"][i % 4],
  intellectualProperty: [
    {
      type: ["Patent", "Copyright", "Trademark"][i % 3],
      status: ["Pending", "Granted", "Not Applicable"][i % 3]
    }
  ],
  
  // Support & Funding
  pastFunding: {
    received: i % 2 === 0,
    funders: [["University", "Government", "NGO"][i % 3]],
    supportTypes: [["Grant", "Investment", "Donation"][i % 3]],
    yearBegan: 2020 + (i % 3),
    duration: 1 + (i % 3),
    amount: 10000 + (i * 2000)
  },
  futureFundingNeeded: i % 3 !== 0,
  
  // Documents
  documents: [
    {
      type: "Proposal",
      name: `Project_${i + 1}_Proposal.pdf`,
      url: "#"
    },
    {
      type: "Report",
      name: `Project_${i + 1}_Report.pdf`,
      url: "#"
    }
  ]
}));