// app/innovation-form/steps/project-details.tsx
"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface ProjectDetailsProps {
  form: any;
}

export default function ProjectDetails({ form }: ProjectDetailsProps) {
  const sdgs = [
    "No Poverty",
    "Zero Hunger",
    "Good Health and Well-being",
    "Quality Education",
    "Gender Equality",
    "Clean Water and Sanitation",
    "Affordable and Clean Energy",
    "Decent Work and Economic Growth",
    "Industry, Innovation and Infrastructure",
    "Reduced Inequalities",
    "Sustainable Cities and Communities",
    "Responsible Consumption and Production",
    "Climate Action",
    "Life Below Water",
    "Life on Land",
    "Peace, Justice and Strong Institutions",
    "Partnerships for the Goals"
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Project Details</h2>
      <p className="text-gray-600">Core information about your innovation project</p>
      
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name *</FormLabel>
              <FormControl>
                <Input 
                  id="projectName"
                  placeholder="Enter your project name" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="projectTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title *</FormLabel>
              <FormControl>
                <Input 
                  id="projectTitle"
                  placeholder="Enter a professional project title" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  id="description"
                  placeholder="Describe your project's purpose and goals."
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
          name="primarySDG"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary SDG *</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger id="primarySDG">
                    <SelectValue placeholder="Select primary SDG" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {sdgs.map((sdg) => (
                    <SelectItem key={sdg} value={sdg}>{sdg}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="additionalSDGs"
          render={() => (
            <FormItem>
              <FormLabel>Additional SDGs (optional, up to 3)</FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {sdgs.map((sdg) => (
                  <FormField
                    key={sdg}
                    control={form.control}
                    name="additionalSDGs"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={sdg}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              id={`sdg-${sdg.replace(/\s+/g, '-').toLowerCase()}`}
                              checked={field.value?.includes(sdg)}
                              onCheckedChange={(checked) => {
                                const currentValues = field.value || [];
                                return checked
                                  ? field.onChange([...currentValues, sdg])
                                  : field.onChange(
                                      currentValues.filter(
                                        (value: string) => value !== sdg
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer" htmlFor={`sdg-${sdg.replace(/\s+/g, '-').toLowerCase()}`}>
                            {sdg}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        
        <FormField
          control={form.control}
          name="executiveSummary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Executive Summary</FormLabel>
              <FormControl>
                <Textarea
                  id="executiveSummary"
                  placeholder="Provide an executive summary of your project."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}