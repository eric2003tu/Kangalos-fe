// app/innovation-form/steps/review.tsx
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface ReviewProps {
  form: any;
}

export default function Review({ form }: ReviewProps) {
  const formValues = form.watch();
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Review Your Submission</h2>
      <p className="text-gray-600">Please review all information before submitting</p>
      
      <div className="space-y-8">
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Project Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Project Name</p>
              <p className="text-sm">{formValues.projectName || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Project Title</p>
              <p className="text-sm">{formValues.projectTitle || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Primary SDG</p>
              <p className="text-sm">{formValues.primarySDG || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Additional SDGs</p>
              <p className="text-sm">
                {formValues.additionalSDGs?.join(", ") || "None selected"}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-gray-500">Description</p>
              <p className="text-sm">{formValues.description || "Not provided"}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-gray-500">Executive Summary</p>
              <p className="text-sm">{formValues.executiveSummary || "Not provided"}</p>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Team & Contacts</h3>
          <div className="space-y-4">
            {formValues.teamMembers?.length > 0 ? (
              formValues.teamMembers.map((member: any, index: number) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="text-sm">{member.name || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-sm">{member.email || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Role</p>
                    <p className="text-sm">{member.role || "Not provided"}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm">No team members added</p>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Primary Phone</p>
                <p className="text-sm">{formValues.primaryPhone || "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Primary Email</p>
                <p className="text-sm">{formValues.primaryEmail || "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Secondary Phone</p>
                <p className="text-sm">{formValues.secondaryPhone || "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Secondary Email</p>
                <p className="text-sm">{formValues.secondaryEmail || "Not provided"}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Classification</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Field of Innovation</p>
              <p className="text-sm">{formValues.fieldOfInnovation || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Expected IP</p>
              <p className="text-sm">
                {formValues.expectedIP?.join(", ") || "None selected"}
              </p>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Support & Funding</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Past Funding</p>
              <p className="text-sm">
                {formValues.pastFunding ? "Yes" : "No"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Future Funding Needs</p>
              <p className="text-sm">
                {formValues.futureFundingNeeds ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Boundary Summary</p>
              <p className="text-sm">
                {formValues.boundarySummary?.name || "Not uploaded"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Business Model</p>
              <p className="text-sm">
                {formValues.businessModel?.name || "Not uploaded"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Implementation Readings</p>
              <p className="text-sm">
                {formValues.implementationReadings?.name || "Not uploaded"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Team Profiles</p>
              <p className="text-sm">
                {formValues.teamProfiles?.name || "Not uploaded"}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-gray-500">Additional Documents</p>
              <p className="text-sm">
                {formValues.additionalDocuments?.length > 0 
                  ? `${formValues.additionalDocuments.length} files uploaded` 
                  : "None uploaded"}
              </p>
            </div>
          </div>
        </div>
        
        <FormField
          control={form.control}
          name="termsAgreed"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I confirm that all information provided is accurate and complete
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}