import { useState } from "react";
import { Plus, X } from "lucide-react";
import { StepProps, TEAM_ROLES } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TooltipField } from "./TooltipField";

export const Step2TeamContacts = ({ formData, updateFormData, onNext, onPrev, isFirstStep }: StepProps) => {
  const [newMember, setNewMember] = useState({ name: "", email: "", role: "" });

  const handleAddTeamMember = () => {
    if (newMember.name.trim() && newMember.email.trim() && newMember.role) {
      updateFormData({
        teamMembers: [...(formData.teamMembers || []), newMember]
      });
      setNewMember({ name: "", email: "", role: "" });
    }
  };

  const handleRemoveTeamMember = (index: number) => {
    const updatedMembers = (formData.teamMembers || []).filter((_, i) => i !== index);
    updateFormData({ teamMembers: updatedMembers });
  };

  const handleContactUpdate = (field: string, value: string) => {
    updateFormData({
      generalContact: {
        ...formData.generalContact,
        [field]: value
      }
    });
  };

  const isValid = (formData.teamMembers?.length || 0) > 0 && 
                  formData.generalContact?.primaryPhone && 
                  formData.generalContact?.primaryEmail;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Team Members & Contacts</h2>
        <p className="text-muted-foreground">Information about your team and contact details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Team Members Section */}
        <div className="space-y-4">
          <TooltipField
            label="Team Members"
            tooltip="Add all team members involved in this project with their roles"
            required
          >
            <div className="space-y-3">
              {(formData.teamMembers || []).map((member, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-2 p-3 border rounded-lg bg-muted/30">
                  <div className="flex-1 space-y-2 sm:space-y-0 sm:space-x-2 sm:flex sm:items-center">
                    <Input value={member.name} readOnly className="flex-1" placeholder="Name" />
                    <Input value={member.email} readOnly className="flex-1" placeholder="Email" />
                    <div className="w-full sm:w-32">
                      <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                        {member.role}
                      </span>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveTeamMember(index)}
                    className="self-start sm:self-center"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              
              {/* Add new member form */}
              <div className="flex flex-col sm:flex-row gap-2 p-3 border-2 border-dashed border-muted-foreground/30 rounded-lg">
                <Input
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  placeholder="Member name"
                  className="flex-1"
                />
                <Input
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  placeholder="Email address"
                  className="flex-1"
                />
                <Select 
                  value={newMember.role} 
                  onValueChange={(value) => setNewMember({ ...newMember, role: value })}
                >
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    {TEAM_ROLES.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddTeamMember}
                  disabled={!newMember.name.trim() || !newMember.email.trim() || !newMember.role}
                  className="w-full sm:w-auto"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </TooltipField>
        </div>

        {/* General Contact Section */}
        <div className="space-y-4">
          <TooltipField
            label="General Project Contact"
            tooltip="Primary contact information for this project"
            required
          >
            <div className="space-y-4">
              <TooltipField
                label="Primary Phone"
                tooltip="Main phone number for project inquiries"
                required
                htmlFor="primaryPhone"
              >
                <Input
                  id="primaryPhone"
                  type="tel"
                  value={formData.generalContact?.primaryPhone || ""}
                  onChange={(e) => handleContactUpdate("primaryPhone", e.target.value)}
                  placeholder="+250 xxx xxx xxx"
                />
              </TooltipField>

              <TooltipField
                label="Primary Email"
                tooltip="Main email address for project communications"
                required
                htmlFor="primaryEmail"
              >
                <Input
                  id="primaryEmail"
                  type="email"
                  value={formData.generalContact?.primaryEmail || ""}
                  onChange={(e) => handleContactUpdate("primaryEmail", e.target.value)}
                  placeholder="project@example.com"
                />
              </TooltipField>

              <TooltipField
                label="Secondary Phone (Optional)"
                tooltip="Alternative phone number for backup contact"
                htmlFor="secondaryPhone"
              >
                <Input
                  id="secondaryPhone"
                  type="tel"
                  value={formData.generalContact?.secondaryPhone || ""}
                  onChange={(e) => handleContactUpdate("secondaryPhone", e.target.value)}
                  placeholder="+250 xxx xxx xxx"
                />
              </TooltipField>

              <TooltipField
                label="Secondary Email (Optional)"
                tooltip="Alternative email address for backup communications"
                htmlFor="secondaryEmail"
              >
                <Input
                  id="secondaryEmail"
                  type="email"
                  value={formData.generalContact?.secondaryEmail || ""}
                  onChange={(e) => handleContactUpdate("secondaryEmail", e.target.value)}
                  placeholder="backup@example.com"
                />
              </TooltipField>
            </div>
          </TooltipField>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={onPrev}
          disabled={isFirstStep}
        >
          Previous
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!isValid}
          className="bg-primary hover:bg-primary/90"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
};