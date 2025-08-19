import { useState } from "react";
import { StepProps, SDGS } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TooltipField } from "./TooltipField";

export const Step1ProjectDetails = ({ formData, updateFormData, onNext }: StepProps) => {
  const [maxAdditionalSDGs] = useState(3);
  
  const handleAdditionalSDGChange = (sdg: string, checked: boolean) => {
    const current = formData.additionalSDGs || [];
    if (checked && current.length < maxAdditionalSDGs) {
      updateFormData({ additionalSDGs: [...current, sdg] });
    } else if (!checked) {
      const updated = current.filter(s => s !== sdg);
      const updatedSolutions = { ...formData.additionalSDGSolutions };
      delete updatedSolutions[sdg];
      updateFormData({ 
        additionalSDGs: updated,
        additionalSDGSolutions: updatedSolutions 
      });
    }
  };

  const handleAdditionalSDGSolution = (sdg: string, solution: string) => {
    updateFormData({
      additionalSDGSolutions: {
        ...formData.additionalSDGSolutions,
        [sdg]: solution
      }
    });
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - i);
  
  const isValid = formData.projectName && formData.primarySDG && formData.projectTitle && formData.year;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Project Details</h2>
        <p className="text-muted-foreground">Core information about your innovation project</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <TooltipField
            label="Project Name"
            tooltip="The official name of your innovation project"
            required
            htmlFor="projectName"
          >
            <Input
              id="projectName"
              value={formData.projectName}
              onChange={(e) => updateFormData({ projectName: e.target.value })}
              placeholder="Enter your project name"
              className="w-full"
            />
          </TooltipField>
        </div>
                <div className="lg:col-span-2">
          <TooltipField
            label="Project Title"
            tooltip="A concise, professional title for your project"
            required
            htmlFor="projectTitle"
          >
            <Input
              id="projectTitle"
              value={formData.projectTitle}
              onChange={(e) => updateFormData({ projectTitle: e.target.value })}
              placeholder="Enter a professional project title"
              maxLength={100}
              className="w-full"
            />
            <div className="text-xs text-muted-foreground mt-1">
              {formData.projectTitle?.length || 0}/100 characters
            </div>
          </TooltipField>
        </div>

        <div className="lg:col-span-2">
          <TooltipField
            label="Description"
            tooltip="A brief overview of what your project aims to achieve"
            htmlFor="description"
          >
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateFormData({ description: e.target.value })}
              placeholder="Describe your project's purpose and goals..."
              rows={3}
              className="w-full"
            />
          </TooltipField>
        </div>

        <div>
          <TooltipField
            label="Primary SDG"
            tooltip="Select the main Sustainable Development Goal your project addresses"
            required
            htmlFor="primarySDG"
          >
            <Select 
              value={formData.primarySDG} 
              onValueChange={(value) => updateFormData({ primarySDG: value, primarySDGSolution: "" })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select primary SDG" />
              </SelectTrigger>
              <SelectContent>
                {SDGS.map((sdg) => (
                  <SelectItem key={sdg} value={sdg}>
                    {sdg}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </TooltipField>
        </div>

        <div>
          <TooltipField
            label="Year"
            tooltip="The year your project started or was conceived"
            required
            htmlFor="year"
          >
            <Select value={formData.year} onValueChange={(value) => updateFormData({ year: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </TooltipField>
        </div>

        {formData.primarySDG && (
          <div className="lg:col-span-2">
            <TooltipField
              label={`How does your project solve ${formData.primarySDG}?`}
              tooltip="Explain specifically how your project addresses this SDG"
              required
              htmlFor="primarySDGSolution"
            >
              <Textarea
                id="primarySDGSolution"
                value={formData.primarySDGSolution}
                onChange={(e) => updateFormData({ primarySDGSolution: e.target.value })}
                placeholder="Describe how your project contributes to this SDG..."
                rows={3}
                className="w-full"
              />
            </TooltipField>
          </div>
        )}

        <div className="lg:col-span-2">
          <TooltipField
            label={`Additional SDGs (optional, up to ${maxAdditionalSDGs})`}
            tooltip="Select up to 3 additional SDGs your project supports"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-40 overflow-y-auto border rounded-md p-3">
                {SDGS.filter(sdg => sdg !== formData.primarySDG).map((sdg) => (
                  <label key={sdg} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={formData.additionalSDGs?.includes(sdg) || false}
                      onChange={(e) => handleAdditionalSDGChange(sdg, e.target.checked)}
                      disabled={!formData.additionalSDGs?.includes(sdg) && (formData.additionalSDGs?.length || 0) >= maxAdditionalSDGs}
                      className="rounded"
                    />
                    <span>{sdg}</span>
                  </label>
                ))}
              </div>
              
              {formData.additionalSDGs?.map((sdg) => (
                <div key={sdg}>
                  <TooltipField
                    label={`How will your project solve ${sdg}?`}
                    tooltip={`Explain how your project addresses ${sdg}`}
                    htmlFor={`solution-${sdg}`}
                  >
                    <Textarea
                      id={`solution-${sdg}`}
                      value={formData.additionalSDGSolutions?.[sdg] || ""}
                      onChange={(e) => handleAdditionalSDGSolution(sdg, e.target.value)}
                      placeholder={`Describe how your project contributes to ${sdg}...`}
                      rows={2}
                      className="w-full"
                    />
                  </TooltipField>
                </div>
              ))}
            </div>
          </TooltipField>
        </div>


        <div className="lg:col-span-2">
          <TooltipField
            label="Executive Summary"
            tooltip="A comprehensive overview of your project, its goals, and expected impact"
            htmlFor="executiveSummary"
          >
            <Textarea
              id="executiveSummary"
              value={formData.executiveSummary}
              onChange={(e) => updateFormData({ executiveSummary: e.target.value })}
              placeholder="Provide an executive summary of your project..."
              rows={4}
              className="w-full"
            />
          </TooltipField>
        </div>
      </div>

      <div className="flex justify-end pt-4">
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