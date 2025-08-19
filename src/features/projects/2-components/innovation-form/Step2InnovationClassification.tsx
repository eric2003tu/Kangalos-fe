import { StepProps, INNOVATION_FIELDS, INNOVATION_SUBFIELDS, IP_TYPES, IP_STATUS_OPTIONS } from "./types";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { TooltipField } from "./TooltipField";

export const Step3InnovationClassification = ({ formData, updateFormData, onNext, onPrev, isFirstStep }: StepProps) => {
  const handleIPChange = (ipType: string, checked: boolean) => {
    const currentIP = formData.expectedIP || [];
    if (checked) {
      updateFormData({ expectedIP: [...currentIP, ipType] });
    } else {
      updateFormData({ 
        expectedIP: currentIP.filter(ip => ip !== ipType),
        ipStatus: { ...formData.ipStatus, [ipType]: "" }
      });
    }
  };

  const handleIPStatusChange = (ipType: string, status: string) => {
    updateFormData({
      ipStatus: { ...formData.ipStatus, [ipType]: status }
    });
  };

  const availableSubfields = formData.fieldOfInnovation ? INNOVATION_SUBFIELDS[formData.fieldOfInnovation] || [] : [];
  const isValid = formData.fieldOfInnovation && formData.expectedIP.length > 0;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Innovation Classification</h2>
        <p className="text-muted-foreground">Technical details and intellectual property aspects</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <TooltipField
            label="Field of Innovation"
            tooltip="Select the primary category that best describes your innovation"
            required
            htmlFor="fieldOfInnovation"
          >
            <Select 
              value={formData.fieldOfInnovation} 
              onValueChange={(value) => updateFormData({ 
                fieldOfInnovation: value,
                innovationSubfield: "" // Reset subfield when main field changes
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select the primary field of your innovation" />
              </SelectTrigger>
              <SelectContent>
                {INNOVATION_FIELDS.map((field) => (
                  <SelectItem key={field} value={field}>
                    {field}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </TooltipField>
        </div>

        {availableSubfields.length > 0 && (
          <div>
            <TooltipField
              label="Innovation Sub-field"
              tooltip="Choose a more specific category within your field"
              htmlFor="innovationSubfield"
            >
              <Select 
                value={formData.innovationSubfield} 
                onValueChange={(value) => updateFormData({ innovationSubfield: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a more specific category" />
                </SelectTrigger>
                <SelectContent>
                  {availableSubfields.map((subfield) => (
                    <SelectItem key={subfield} value={subfield}>
                      {subfield}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TooltipField>
          </div>
        )}

        <div className="lg:col-span-2">
          <TooltipField
            label="Expected Intellectual Property"
            tooltip="Select all types of intellectual property your project may generate"
            required
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
              {IP_TYPES.map((ipType) => {
                const isChecked = formData.expectedIP.includes(ipType);
                return (
                  <div key={ipType} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={ipType}
                        checked={isChecked}
                        onCheckedChange={(checked) => handleIPChange(ipType, checked as boolean)}
                      />
                      <label htmlFor={ipType} className="text-sm">
                        {ipType}
                      </label>
                    </div>
                    
                    {isChecked && ipType !== "None Expected" && (
                      <div className="ml-6">
                        <TooltipField
                          label={`Status for ${ipType}`}
                          tooltip={`Current development status of your ${ipType}`}
                        >
                          <Select
                            value={formData.ipStatus[ipType] || ""}
                            onValueChange={(value) => handleIPStatusChange(ipType, value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              {IP_STATUS_OPTIONS.map((status) => (
                                <SelectItem key={status} value={status}>
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TooltipField>
                      </div>
                    )}

                    {isChecked && ipType === "Other" && (
                      <div className="ml-6">
                        <Input
                          placeholder="Please specify other IP type"
                          value={formData.ipStatus["Other_specify"] || ""}
                          onChange={(e) => handleIPStatusChange("Other_specify", e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
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