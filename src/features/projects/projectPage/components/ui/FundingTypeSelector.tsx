import React, { useState } from 'react';

// Mock data arrays
const NON_MONETARY_SUPPORT_TYPES = [
  "Mentorship",
  "Training/Workshops", 
  "Workspace Access",
  "Equipment/Resources",
  "Market Access",
  "Technical Support",
  "Legal Support",
  "Marketing Support",
  "Networking Opportunities",
  "Other"
];

const EXPECTED_FUNDERS = [
  "Government Grants",
  "International Organizations", 
  "Private Investors",
  "Venture Capital",
  "Angel Investors",
  "Crowdfunding",
  "Bank Loans",
  "Development Partners",
  "Other"
];

// UI Components
interface CheckboxProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, checked, onCheckedChange }) => (
  <input
    type="checkbox"
    id={id}
    checked={checked}
    onChange={(e) => onCheckedChange(e.target.checked)}
    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
  />
);

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ htmlFor, children, className = "" }) => (
  <label htmlFor={htmlFor} className={`text-sm font-medium text-gray-700 ${className}`}>
    {children}
  </label>
);

interface InputProps {
  id?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({ id, type = "text", placeholder, value, onChange, className = "" }) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${className}`}
  />
);

interface TextareaProps {
  id?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

const Textarea: React.FC<TextareaProps> = ({ id, placeholder, value, onChange, rows = 3 }) => (
  <textarea
    id={id}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    rows={rows}
    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
  />
);

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ value, onValueChange, children }) => (
  <select
    value={value}
    onChange={(e) => onValueChange(e.target.value)}
    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
  >
    {children}
  </select>
);

const SelectTrigger: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
const SelectContent: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
const SelectValue: React.FC<{ placeholder: string }> = ({ placeholder }) => <option value="">{placeholder}</option>;
const SelectItem: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => (
  <option value={value}>{children}</option>
);

interface TooltipFieldProps {
  label: string;
  tooltip: string;
  id: string;
  children: React.ReactNode;
}

const TooltipField: React.FC<TooltipFieldProps> = ({ label, tooltip, id, children }) => (
  <div className="space-y-2">
    <div className="flex items-center space-x-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      <div className="group relative">
        <div className="h-4 w-4 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center cursor-help">
          ?
        </div>
        <div className="invisible group-hover:visible absolute z-10 w-64 p-2 mt-1 text-xs text-white bg-gray-900 rounded-md shadow-lg">
          {tooltip}
        </div>
      </div>
    </div>
    {children}
  </div>
);

export const FundingTypeSelector = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [nonMonetarySupport, setNonMonetarySupport] = useState<string[]>([]);
  const [nonMonetarySupportOther, setNonMonetarySupportOther] = useState("");
  const [nonMonetaryDescription, setNonMonetaryDescription] = useState("");
  const [monetaryAmount, setMonetaryAmount] = useState("");
  const [expectedFunder, setExpectedFunder] = useState("");
  const [expectedFunderOther, setExpectedFunderOther] = useState("");
  const [monetaryExplanation, setMonetaryExplanation] = useState("");
  const [currency, setCurrency] = useState("");

  const handleTypeChange = (type: string, checked: boolean) => {
    const newTypes = checked 
      ? [...selectedTypes, type]
      : selectedTypes.filter(t => t !== type);
    setSelectedTypes(newTypes);
  };

  const handleNonMonetarySupportChange = (support: string, checked: boolean) => {
    const current = nonMonetarySupport;
    if (checked) {
      setNonMonetarySupport([...current, support]);
    } else {
      setNonMonetarySupport(current.filter(s => s !== support));
    }
  };

  const showNonMonetaryDetails = selectedTypes.includes("non-monetary");
  const showMonetaryDetails = selectedTypes.includes("monetary");

  return (
    <div className="space-y-6">
      <TooltipField
        label="Type of Funding offered"
        tooltip="Select the type(s) of funding you offer- you can choose both"
        id="funding-type"
      >
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="non-monetary"
              checked={selectedTypes.includes("non-monetary")}
              onCheckedChange={(checked) => handleTypeChange("non-monetary", checked)}
            />
            <Label htmlFor="non-monetary">Non-monetary support</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="monetary"
              checked={selectedTypes.includes("monetary")}
              onCheckedChange={(checked) => handleTypeChange("monetary", checked)}
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
              tooltip="Select the types of support you Offered"
              id="non-monetary-types"
            >
              <div className="space-y-2 max-h-48 overflow-y-auto border rounded-md p-3">
                {NON_MONETARY_SUPPORT_TYPES.map((support) => (
                  <div key={support} className="flex items-center space-x-2">
                    <Checkbox
                      id={`non-monetary-${support}`}
                      checked={nonMonetarySupport.includes(support)}
                      onCheckedChange={(checked) => handleNonMonetarySupportChange(support, checked)}
                    />
                    <Label htmlFor={`non-monetary-${support}`} className="text-sm">
                      {support}
                    </Label>
                  </div>
                ))}
              </div>
            </TooltipField>

            {nonMonetarySupport.includes("Other") && (
              <div className="mt-4">
                <Input
                  placeholder="Please specify other support type..."
                  value={nonMonetarySupportOther}
                  onChange={(e) => setNonMonetarySupportOther(e.target.value)}
                />
              </div>
            )}
          </div>

          <div>
            <TooltipField
              label="Description of Support Offered"
              tooltip="Explain how it will help the project"
              id="nonMonetaryDescription"
            >
              <Textarea
                id="nonMonetaryDescription"
                value={nonMonetaryDescription}
                onChange={(e) => setNonMonetaryDescription(e.target.value)}
                placeholder="Describe the support you Offered..."
                rows={4}
              />
            </TooltipField>
          </div>
        </div>
      )}

      {showMonetaryDetails && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
<div className="grid lg:grid-cols-2 w-full gap-6">
  <TooltipField
    label="Amount Offered"
    tooltip="Specify the amount of funding decided to offer"
    id="monetaryAmount"
  >
    <Input
      id="monetaryAmount"
      type="number"
      value={monetaryAmount}
      onChange={(e) => setMonetaryAmount(e.target.value)}
      placeholder="Enter the amount "
    />
  </TooltipField>

  <TooltipField
    label="Currency"
    tooltip="Select the currency of the offered amount"
    id="currency"
  >
    <select
      id="currency"
      name="currency"
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      className="w-full rounded-lg border border-gray-300 p-2 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
    >
      <option value="">-- Select Currency --</option>
      <option value="RWF">Rwandan Franc (RWF)</option>
      <option value="USD">US Dollar (USD)</option>
      <option value="EUR">Euro (EUR)</option>
      <option value="GBP">British Pound (GBP)</option>
      <option value="KES">Kenyan Shilling (KES)</option>
      <option value="TZS">Tanzanian Shilling (TZS)</option>
      <option value="UGX">Ugandan Shilling (UGX)</option>
      <option value="ZAR">South African Rand (ZAR)</option>
      <option value="JPY">Japanese Yen (JPY)</option>
      <option value="CNY">Chinese Yuan (CNY)</option>
      <option value="CAD">Canadian Dollar (CAD)</option>
      <option value="AUD">Australian Dollar (AUD)</option>
      <option value="INR">Indian Rupee (INR)</option>
    </select>
  </TooltipField>
</div>


          <div>
          </div>

          <div className="lg:col-span-2">
            <TooltipField
              label="Explanation of Funding Use"
              tooltip="Explain how the funding will be used and what outcomes you expect"
              id="monetaryExplanation"
            >
              <Textarea
                id="monetaryExplanation"
                value={monetaryExplanation}
                onChange={(e) => setMonetaryExplanation(e.target.value)}
                placeholder="Describe how you will use the funding..."
                rows={4}
              />
            </TooltipField>
          </div>
        </div>
      )}
    </div>
  );
};