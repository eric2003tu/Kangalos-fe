import { StepProps, SUPPORT_TYPES, SUPPORT_PROVIDERS, NON_MONETARY_SUPPORT_TYPES, EXPECTED_FUNDERS, FormData } from "@/features/projects/2-components/innovation-form/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TooltipField } from "@/features/projects/2-components/innovation-form/TooltipField";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Project } from "@/lib/projects";
import { useParams } from "next/navigation";

export const Step4SupportFunding = ({ formData, updateFormData, onNext, onPrev, isFirstStep}: StepProps) => {
      const params = useParams();
    const router = useRouter();
    const projectId = params?.id ? parseInt(params.id as string) : null;
  const handlePastFundingUpdate = <K extends keyof FormData["pastFunding"]>(
    field: K,
    value: FormData["pastFunding"][K]
  ) => {
    updateFormData({
      pastFunding: {
        ...formData.pastFunding,
        [field]: value,
      },
    });
  };

  const handleFutureFundingUpdate = <K extends keyof FormData["futureFunding"]>(
    field: K,
    value: FormData["futureFunding"][K]
  ) => {
    updateFormData({
      futureFunding: {
        ...formData.futureFunding,
        [field]: value,
      },
    });
  };

  const handleSupportTypeChange = (supportType: string, checked: boolean) => {
    const currentTypes = formData.pastFunding?.supportTypes || [];
    if (checked) {
      handlePastFundingUpdate("supportTypes", [...currentTypes, supportType]);
    } else {
      handlePastFundingUpdate("supportTypes", currentTypes.filter(type => type !== supportType));
    }
  };

  const handleFunderChange = (funder: string, checked: boolean) => {
    const currentFunders = formData.pastFunding?.funders || [];
    if (checked) {
      handlePastFundingUpdate("funders", [...currentFunders, funder]);
    } else {
      handlePastFundingUpdate("funders", currentFunders.filter(f => f !== funder));
    }
  };

  const handleNonMonetarySupportChange = (support: string, checked: boolean) => {
    const current = formData.futureFunding?.nonMonetarySupport || [];
    if (checked) {
      handleFutureFundingUpdate("nonMonetarySupport", [...current, support]);
    } else {
      handleFutureFundingUpdate("nonMonetarySupport", current.filter(s => s !== support));
    }
  };

  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: currentYear - 2014 }, (_, i) => currentYear - i);

  const hasOtherProvider = formData.pastFunding?.supportProviders?.includes("Other") || false;
  const showFutureFundingDetails = formData.futureFunding?.needsFunding;
  const showNonMonetaryDetails = showFutureFundingDetails && (formData.futureFunding?.fundingTypes || []).includes("non-monetary");
  const showMonetaryDetails = showFutureFundingDetails && (formData.futureFunding?.fundingTypes || []).includes("monetary");

  return (
    <div className="space-y-8">
<div className="relative mb-8">
  {/* Left Icon */}
  <div className="absolute left-0 top-1/2 -translate-y-1/2">
    <Link href={`/dashboard/projectPage/${projectId}`}>
      <Button variant="ghost" size="icon" className="rounded-full">
        <ArrowLeft className="h-5 w-5" />
      </Button>
    </Link>
  </div>

  {/* Centered Text */}
  <div className="text-center">
    <h2 className="text-2xl font-bold text-foreground mb-2">
      Finding Fnders and Supports
    </h2>
    <p className="text-muted-foreground">
      Past funding received and future funding needs
    </p>
  </div>
</div>


      {/* Past Funding Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">Past Funding</h3>
        
        <TooltipField
          label="Has the project received past funding?"
          tooltip="Select whether your project has received any previous funding or support"
          id="past-funding"
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="has-past-funding"
                checked={formData.pastFunding.hasPastFunding}
                onCheckedChange={(checked) => updateFormData({
                  pastFunding: { ...formData.pastFunding, hasPastFunding: checked === true }
                })}
              />
              <Label htmlFor="has-past-funding">Yes, we have received past funding or support</Label>
            </div>
          </div>
        </TooltipField>

        {formData.pastFunding?.hasPastFunding && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <TooltipField
                label="Previous Funders"
                tooltip="Select all organizations that have provided funding"
                id="previous-funders"
              >
                <div className="space-y-2 max-h-48 overflow-y-auto border rounded-md p-3">
                  {SUPPORT_PROVIDERS.map((provider) => (
                    <div key={provider} className="flex items-center space-x-2">
                      <Checkbox
                        id={`funder-${provider}`}
                        checked={formData.pastFunding?.funders?.includes(provider) || false}
                        onCheckedChange={(checked) => handleFunderChange(provider, checked as boolean)}
                      />
                      <Label htmlFor={`funder-${provider}`} className="text-sm">
                        {provider}
                      </Label>
                    </div>
                  ))}
                </div>
              </TooltipField>

              {hasOtherProvider && (
                <Input
                  placeholder="Please specify other funder"
                  value={formData.pastFunding?.supportProviderOther || ""}
                  onChange={(e) => handlePastFundingUpdate("supportProviderOther", e.target.value)}
                  className="mt-2"
                />
              )}
            </div>

            <div>
              <TooltipField
                label="Types of Support Received"
                tooltip="Select all types of support your project has received"
                id="support-types"
              >
                <div className="space-y-2 max-h-48 overflow-y-auto border rounded-md p-3">
                  {SUPPORT_TYPES.map((supportType) => (
                    <div key={supportType} className="flex items-center space-x-2">
                      <Checkbox
                        id={`support-${supportType}`}
                        checked={formData.pastFunding?.supportTypes?.includes(supportType) || false}
                        onCheckedChange={(checked) => handleSupportTypeChange(supportType, checked as boolean)}
                      />
                      <Label htmlFor={`support-${supportType}`} className="text-sm">
                        {supportType}
                      </Label>
                    </div>
                  ))}
                </div>
              </TooltipField>
            </div>

            <div>
              <TooltipField
                label="Year Support Began"
                tooltip="When did you first receive support for this project?"
                id="yearSupportBegan"
              >
                <Select 
                  value={formData.pastFunding?.yearSupportBegan || ""} 
                  onValueChange={(value) => handlePastFundingUpdate("yearSupportBegan", value)}
                >
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

            <div>
              <TooltipField
                label="Support Duration"
                tooltip="How long did the support last?"
                id="support-duration"
              >
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Duration"
                    value={formData.pastFunding?.supportDuration || ""}
                    onChange={(e) => handlePastFundingUpdate("supportDuration", e.target.value)}
                    className="flex-1"
                  />
                  <Select 
                    value={formData.pastFunding?.supportDurationUnit || ""} 
                    onValueChange={(value) => handlePastFundingUpdate("supportDurationUnit", value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Months">Months</SelectItem>
                      <SelectItem value="Years">Years</SelectItem>
                      <SelectItem value="Ongoing">Ongoing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TooltipField>
            </div>

            {formData.pastFunding?.supportTypes?.includes("Seed Funding") && (
              <div className="lg:col-span-2">
                <TooltipField
                  label="Funding Amount (RWF)"
                  tooltip="Total amount of funding received"
                  id="fundingAmount"
                >
                  <Input
                    id="fundingAmount"
                    type="number"
                    placeholder="Enter amount in RWF"
                    value={formData.pastFunding?.fundingAmount || ""}
                    onChange={(e) => handlePastFundingUpdate("fundingAmount", e.target.value)}
                  />
                </TooltipField>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Future Funding Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">Future Funding Needs</h3>
        
        <TooltipField
          label="Do you need funding for your project?"
          tooltip="Indicate whether you require additional funding or support"
          id="future-funding"
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="needs-funding"
                checked={formData.futureFunding.needsFunding}
                onCheckedChange={(checked) => updateFormData({
                  futureFunding: { ...formData.futureFunding, needsFunding: checked === true }
                })}
              />
              <Label htmlFor="needs-funding">Yes, we need future funding or support</Label>
            </div>
          </div>
        </TooltipField>

        {showFutureFundingDetails && (
          <div className="space-y-6">
            <TooltipField
              label="Type of Funding Needed"
              tooltip="Select the type(s) of funding you need - you can choose both"
              id="funding-type"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="non-monetary"
                    checked={formData.futureFunding.fundingTypes.includes("non-monetary")}
                    onCheckedChange={(checked) => {
                      const types = formData.futureFunding.fundingTypes;
                      const newTypes = checked 
                        ? [...types, "non-monetary"]
                        : types.filter(t => t !== "non-monetary");
                      updateFormData({
                        futureFunding: { ...formData.futureFunding, fundingTypes: newTypes }
                      });
                    }}
                  />
                  <Label htmlFor="non-monetary">Non-monetary support</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="monetary"
                    checked={formData.futureFunding.fundingTypes.includes("monetary")}
                    onCheckedChange={(checked) => {
                      const types = formData.futureFunding.fundingTypes;
                      const newTypes = checked 
                        ? [...types, "monetary"]
                        : types.filter(t => t !== "monetary");
                      updateFormData({
                        futureFunding: { ...formData.futureFunding, fundingTypes: newTypes }
                      });
                    }}
                  />
                  <Label htmlFor="monetary">Monetary funding</Label>
                </div>
              </div>
            </TooltipField>

            {showNonMonetaryDetails && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <TooltipField
                    label="Non-monetary Support Types"
                    tooltip="Select the types of support you need"
                    id="non-monetary-types"
                  >
                    <div className="space-y-2 max-h-48 overflow-y-auto border rounded-md p-3">
                      {NON_MONETARY_SUPPORT_TYPES.map((support) => (
                        <div key={support} className="flex items-center space-x-2">
                          <Checkbox
                            id={`non-monetary-${support}`}
                            checked={formData.futureFunding?.nonMonetarySupport?.includes(support) || false}
                            onCheckedChange={(checked) => handleNonMonetarySupportChange(support, checked as boolean)}
                          />
                          <Label htmlFor={`non-monetary-${support}`} className="text-sm">
                            {support}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </TooltipField>

                  {(formData.futureFunding?.nonMonetarySupport || []).includes("Other") && (
                    <div className="mt-4">
                      <Input
                        placeholder="Please specify other support type..."
                        value={formData.futureFunding.nonMonetarySupportOther || ""}
                        onChange={(e) => updateFormData({
                          futureFunding: { 
                            ...formData.futureFunding, 
                            nonMonetarySupportOther: e.target.value 
                          }
                        })}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <TooltipField
                    label="Description of Support Required"
                    tooltip="Explain what specific support you need and how it will help your project"
                    id="nonMonetaryDescription"
                  >
                    <Textarea
                      id="nonMonetaryDescription"
                      value={formData.futureFunding?.nonMonetaryDescription || ""}
                      onChange={(e) => handleFutureFundingUpdate("nonMonetaryDescription", e.target.value)}
                      placeholder="Describe the support you need..."
                      rows={4}
                    />
                  </TooltipField>
                </div>
              </div>
            )}

            {showMonetaryDetails && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <TooltipField
                    label="Amount Needed (RWF)"
                    tooltip="Specify the amount of funding you require"
                    id="monetaryAmount"
                  >
                    <Input
                      id="monetaryAmount"
                      type="number"
                      value={formData.futureFunding?.monetaryAmount || ""}
                      onChange={(e) => handleFutureFundingUpdate("monetaryAmount", e.target.value)}
                      placeholder="Enter amount in RWF"
                    />
                  </TooltipField>
                </div>

                <div>
                  <TooltipField
                    label="Expected Funder"
                    tooltip="Who do you expect to provide this funding?"
                    id="expectedFunder"
                  >
                    <Select 
                      value={formData.futureFunding?.expectedFunder || ""} 
                      onValueChange={(value) => handleFutureFundingUpdate("expectedFunder", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select expected funder" />
                      </SelectTrigger>
                      <SelectContent>
                        {EXPECTED_FUNDERS.map((funder) => (
                          <SelectItem key={funder} value={funder}>
                            {funder}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {formData.futureFunding?.expectedFunder === "Other" && (
                      <div className="mt-4">
                        <Input
                          placeholder="Specify the other expected funder..."
                          value={formData.futureFunding.expectedFunderOther || ""}
                          onChange={(e) => updateFormData({
                            futureFunding: { 
                              ...formData.futureFunding, 
                              expectedFunderOther: e.target.value 
                            }
                          })}
                        />
                      </div>
                    )}
                  </TooltipField>
                </div>

                <div className="lg:col-span-2">
                  <TooltipField
                    label="Explanation of Funding Use"
                    tooltip="Explain how the funding will be used and what outcomes you expect"
                    id="monetaryExplanation"
                  >
                    <Textarea
                      id="monetaryExplanation"
                      value={formData.futureFunding?.monetaryExplanation || ""}
                      onChange={(e) => handleFutureFundingUpdate("monetaryExplanation", e.target.value)}
                      placeholder="Describe how you will use the funding..."
                      rows={4}
                    />
                  </TooltipField>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-self-end items-end pt-4">
        <Button 
          onClick={onNext}
          className="bg-primary hover:bg-primary/90"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};