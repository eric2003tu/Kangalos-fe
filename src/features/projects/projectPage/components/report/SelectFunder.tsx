// Updated SelectFunder Component
import { TooltipField } from '@/features/projects/2-components/innovation-form/TooltipField'
import { Checkbox } from '@mantine/core'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Input } from "@/components/ui/input"
import React from 'react'

type PastFunding = {
  hasPastFunding: boolean;
  funders?: string[];
};

const SUPPORT_PROVIDERS = [
  "World Vision",
  "Mastercard Foundation",
  "NGO/Foundation",
  "Private Company",
  "International Organization",
  "Other"
];

type SelectFunderProps = {
  onOtherFunderChange?: (value: string) => void;
  onOtherCheckChange?: (checked: boolean) => void;
  selectedFunders?: string[];
};

const SelectFunder: React.FC<SelectFunderProps> = ({
  onOtherFunderChange,
  onOtherCheckChange,
  selectedFunders = [],
}) => {
  const [formData, setFormData] = React.useState<PastFunding>({
    hasPastFunding: false,
    funders: [],
  });

  const [otherFunder, setOtherFunder] = React.useState("");

  const handleFunderChange = (provider: string, checked: boolean) => {
    setFormData((prev) => {
      const funders = prev.funders || [];
      let updatedFunders = checked
        ? [...funders, provider]
        : funders.filter((f) => f !== provider && !f.startsWith("Other:"));

      return { ...prev, funders: updatedFunders };
    });

    // If "Other" checkbox is clicked, notify parent component immediately
    if (provider === "Other") {
      console.log('Notifying parent - Other checkbox:', checked) // Debug log
      onOtherCheckChange?.(checked);
      if (!checked) {
        setOtherFunder("");
        onOtherFunderChange?.("");
      }
    }
  };

  const handleOtherInputChange = (value: string) => {
    setOtherFunder(value);
    onOtherFunderChange?.(value);

    // Update the funders list with the other funder value
    setFormData((prev) => {
      const funders = prev.funders || [];
      // Remove any existing "Other:" entries but keep "Other"
      const withoutOtherValue = funders.filter(f => !f.startsWith("Other:"));
      // Add the new "Other: value" entry if there's a value
      return { 
        ...prev, 
        funders: value ? [...withoutOtherValue, `Other: ${value}`] : withoutOtherValue 
      };
    });
  };

  return (
    <TooltipField
      label="Do you want to select the name of the funder to send the report to?"
      tooltip="Select whether you want to select the certain funder to send the report to."
      id="past-funding"
    >
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="has-past-funding"
            checked={formData.hasPastFunding}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                hasPastFunding: event.target.checked,
              }))
            }
          />
          <Label>Yes, We want to select the funders to report to.</Label>
        </div>

        {formData.hasPastFunding && (
          <div className="space-y-2 max-h-48 overflow-y-auto border rounded-md p-3">
            {SUPPORT_PROVIDERS.map((provider) => (
              <div key={provider} className="flex items-center space-x-2">
                <Checkbox
                  id={`funder-${provider}`}
                  checked={
                    formData.funders?.some((f) =>
                      provider === "Other"
                        ? f.startsWith("Other:") || f === "Other"
                        : f === provider
                    ) || false
                  }
                  onChange={(event) =>
                    handleFunderChange(provider, event.target.checked)
                  }
                />
                <Label className="text-sm">{provider}</Label>

                {/* No input field here anymore - removed */}
              </div>
            ))}
          </div>
        )}
      </div>
    </TooltipField>
  );
};

export default SelectFunder;