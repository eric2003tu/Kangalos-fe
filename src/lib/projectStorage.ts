import { FormData, INNOVATION_FIELDS } from "@/features/projects/2-components/innovation-form/types";

export interface Project extends FormData {
  id: string;
  createdAt: string;
  updatedAt: string;
}

const SUBMISSIONS_KEY = "innovation-form-submissions";

export const getProjects = (): Project[] => {
  try {
    const raw = localStorage.getItem(SUBMISSIONS_KEY);
    console.log('Raw localStorage data:', raw);
    console.log('Storage key:', SUBMISSIONS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    console.log('Parsed projects from localStorage:', parsed);
    return parsed;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

export const getProjectById = (id: string): Project | undefined => {
  return getProjects().find((p) => p.id === id);
};

export const addProject = (data: FormData): Project => {
  const projects = getProjects();
  const timestamp = new Date().toISOString();
  const project: Project = {
    ...data,
    id: Date.now().toString(),
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  projects.push(project);
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(projects));
  return project;
};

const baseFormData: FormData = {
  projectName: "",
  description: "",
  primarySDG: "",
  primarySDGSolution: "",
  additionalSDGs: [],
  additionalSDGSolutions: {},
  projectTitle: "",
  year: "",
  executiveSummary: "",
  teamMembers: [],
  generalContact: {
    primaryPhone: "",
    primaryEmail: "",
    secondaryPhone: "",
    secondaryEmail: "",
  },
  fieldOfInnovation: "",
  innovationSubfield: "",
  expectedIP: [],
  ipStatus: {},
  documents: {
    required: {},
    optional: [],
  },
  pastFunding: {
    hasPastFunding: false,
    funders: [],
    supportTypes: [],
    supportProviders: [],
    supportProviderOther: "",
    yearSupportBegan: "",
    supportDuration: "",
    supportDurationUnit: "",
    fundingAmount: "",
  },
  futureFunding: {
    needsFunding: false,
    fundingTypes: [],
    nonMonetarySupport: [],
    nonMonetaryDescription: "",
    monetaryAmount: "",
    monetaryExplanation: "",
    expectedFunder: "",
  },
};

export const seedProjects = (count = 40) => {
  const projects: Project[] = Array.from({ length: count }).map((_, i) => {
    const field = INNOVATION_FIELDS[i % INNOVATION_FIELDS.length];
    const formData: FormData = {
      ...baseFormData,
      projectName: `UR CST Mastercard Project ${i + 1}`,
      description:
        "Sample innovation from University of Rwanda CST students supported by the Mastercard Foundation.",
      fieldOfInnovation: field,
      pastFunding: {
        ...baseFormData.pastFunding,
        hasPastFunding: true,
        funders: ["Mastercard Foundation"],
        supportTypes: ["Seed Funding"],
        supportProviders: ["University of Rwanda"],
        fundingAmount: `${5000 + i * 100}`,
      },
    };
    const timestamp = new Date().toISOString();
    return {
      ...formData,
      id: (Date.now() + i).toString(),
      createdAt: timestamp,
      updatedAt: timestamp,
    };
  });

  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(projects));
  return projects;
};

export { SUBMISSIONS_KEY };
