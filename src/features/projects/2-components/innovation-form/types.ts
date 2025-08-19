export interface FormData {
  // Step 1: Project Details
  projectName: string;
  description: string;
  primarySDG: string;
  primarySDGSolution: string;
  additionalSDGs: string[];
  additionalSDGSolutions: Record<string, string>;
  projectTitle: string;
  year: string;
  executiveSummary: string;

  // Step 2: Team Members & Contacts
  teamMembers: Array<{
    name: string;
    email: string;
    role: string;
  }>;
  generalContact: {
    primaryPhone: string;
    primaryEmail: string;
    secondaryPhone: string;
    secondaryEmail: string;
  };

  // Step 3: Innovation Classification
  fieldOfInnovation: string;
  innovationSubfield: string;
  expectedIP: string[];
  ipStatus: Record<string, string>;

  // Step 4: Support & Funding History
  pastFunding: {
    hasPastFunding: boolean;
    funders: string[];
    supportTypes: string[];
    supportProviders: string[];
    supportProviderOther: string;
    yearSupportBegan: string;
    supportDuration: string;
    supportDurationUnit: string;
    fundingAmount: string;
  };
  futureFunding: {
    needsFunding: boolean;
    fundingTypes: string[]; // ["monetary", "non-monetary"]
    nonMonetarySupport: string[];
    nonMonetaryDescription: string;
    nonMonetarySupportOther?: string;
    monetaryAmount: string;
    monetaryExplanation: string;
    expectedFunder: string;
    expectedFunderOther?: string;
  };

  // Step 5: Document Upload
  documents: {
    required: Record<string, string>; // document type -> file name
    optional: Array<{name: string; fileName: string}>;
  };
}

export interface StepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export const SCHOOLS = [
  "College of Agriculture and Veterinary Medicine",
  "College of Arts and Social Sciences", 
  "College of Business and Economics",
  "College of Education",
  "College of Engineering",
  "College of Medicine and Health Sciences",
  "College of Science and Technology",
  "School of Law",
  "Other"
];

export const INNOVATION_FIELDS = [
  "Agriculture & Food Security",
  "Health & Medical",
  "ICT & Digital Solutions", 
  "Energy & Environment",
  "Education & Training",
  "Manufacturing & Industry",
  "Financial Services",
  "Transportation",
  "Other"
];

export const INNOVATION_SUBFIELDS: Record<string, string[]> = {
  "Health & Medical": ["Medical Devices", "Digital Health", "Pharmaceuticals", "Diagnostics"],
  "ICT & Digital Solutions": ["Mobile Apps", "Web Platforms", "AI/ML", "Blockchain", "IoT"],
  "Agriculture & Food Security": ["Crop Technology", "Livestock", "Food Processing", "AgTech"],
  "Energy & Environment": ["Renewable Energy", "Energy Storage", "Waste Management", "Water Treatment"],
  "Education & Training": ["E-learning", "Skill Development", "Educational Technology"],
  "Manufacturing & Industry": ["Process Innovation", "Product Design", "Automation"],
  "Financial Services": ["Fintech", "Insurance", "Payment Solutions"],
  "Transportation": ["Logistics", "Mobility Solutions", "Vehicle Technology"],
  "Other": []
};

export const IP_TYPES = [
  "Patent",
  "Utility Model", 
  "Copyright",
  "Trade Secret",
  "None Expected",
  "Other"
];

export const IP_STATUS_OPTIONS = [
  "Planned",
  "Application Filed",
  "Granted", 
  "Not Applicable"
];

export const SUPPORT_TYPES = [
  "Mentorship",
  "Seed Funding",
  "Training/Workshops", 
  "Workspace Access",
  "Equipment/Resources",
  "Market Access",
  "Other"
];

export const SUPPORT_PROVIDERS = [
  "University of Rwanda",
  "Government Agency",
  "NGO/Foundation",
  "Private Company", 
  "International Organization",
  "Other"
];

export const TEAM_ROLES = [
  "Lead",
  "Supervisor", 
  "Team Member"
];

export const NON_MONETARY_SUPPORT_TYPES = [
  "Mentorship",
  "Training/Workshops",
  "Workspace Access", 
  "Equipment/Resources",
  "Market Access",
  "Technical Support",
  "Legal Support",
  "Other"
];

export const EXPECTED_FUNDERS = [
  "University of Rwanda",
  "Government Agency",
  "Private Investor",
  "NGO/Foundation",
  "International Organization",
  "Bank/Financial Institution",
  "Venture Capital",
  "Other"
];

export const REQUIRED_DOCUMENTS = [
  "Project Proposal / Concept Note",
  "Executive Summary", 
  "Business Model Canvas",
  "Implementation Roadmap / Gantt Chart",
  "Team Profiles / CVs"
];

export const OPTIONAL_DOCUMENTS = [
  "Project Charter",
  "Market Research Report",
  "Feasibility Study / Technical Assessment",
  "Prototype or Mockups",
  "Budget & Financial Forecast", 
  "Risk & Mitigation Plan",
  "Funding or Grant Applications",
  "Intellectual Property (IP) Search or Strategy",
  "Regulatory / Ethical Compliance Documents",
  "Pitch Deck or Presentation"
];

export const DEVELOPMENT_STAGES = [
  "Concept/Idea",
  "Prototype Development",
  "Testing Phase",
  "Pilot Implementation", 
  "Scale-up",
  "Market Ready"
];

export const SDGS = [
  "1. No Poverty",
  "2. Zero Hunger", 
  "3. Good Health and Well-being",
  "4. Quality Education",
  "5. Gender Equality",
  "6. Clean Water and Sanitation",
  "7. Affordable and Clean Energy",
  "8. Decent Work and Economic Growth",
  "9. Industry, Innovation and Infrastructure",
  "10. Reduced Inequalities",
  "11. Sustainable Cities and Communities",
  "12. Responsible Consumption and Production",
  "13. Climate Action",
  "14. Life Below Water",
  "15. Life on Land",
  "16. Peace, Justice and Strong Institutions",
  "17. Partnerships for the Goals"
];