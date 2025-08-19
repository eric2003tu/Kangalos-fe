export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  status: "Previously funded" | "New";
  amount: number;
  university: string;
  date: string;
  
  // Project Details
  primarySDG: string;
  year: number;
  sdgSolutions: Record<string, string>;
  additionalSDGs: string[];
  executiveSummary: string;
  
  // Team & Contacts
  teamMembers: {
    name: string;
    email: string;
    role: string;
  }[];
  contacts: {
    primaryPhone: string;
    primaryEmail: string;
    secondaryPhone?: string;
    secondaryEmail?: string;
  };
  
  // Classification
  fieldOfInnovation: string;
  subField: string;
  intellectualProperty: {
    type: string;
    status: string;
  }[];
  
  // Support & Funding
  pastFunding: {
    received: boolean;
    funders: string[]; // Explicitly type as array
    supportTypes: string[];
    yearBegan: number;
    duration: number;
    amount: number;
  };
  futureFundingNeeded: boolean;
  
  // Documents
  documents: {
    type: string;
    name: string;
    url: string;
  }[];
}

export const sampleProjects: Project[] = Array.from({ length: 36 }, (_, i) => ({
  id: i + 1,
  title: `Innovation Project ${i + 1}`,
  description: `This project demonstrates innovative solutions in ${["Agriculture", "Health", "ICT", "Energy"][i % 4]} developed by university students`,
  category: ["Agriculture & Food Security", "Health & Medical", "ICT & Digital Solutions", "Energy & Environment"][i % 4],
  status: i % 3 === 0 ? "New" : "Previously funded",
  amount: 5000 + (i * 1000),
  university: ["UR", "KIST", "INES", "CMU"][i % 4],
  date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
  
  // Project Details
  primarySDG: `${(i % 17) + 1}. ${["No Poverty", "Zero Hunger", "Good Health", "Quality Education"][i % 4]}`,
  year: 2023 - (i % 3),
  sdgSolutions: {
    [`${(i % 17) + 1}`]: `Solution details for SDG ${(i % 17) + 1}`
  },
  additionalSDGs: [
    `${(i % 17) + 2}. Additional SDG 1`,
    `${(i % 17) + 3}. Additional SDG 2`
  ],
  executiveSummary: `Executive summary for project ${i + 1} demonstrating impact and innovation`,
  
  // Team & Contacts
  teamMembers: [
    {
      name: `Member ${i + 1}`,
      email: `member${i + 1}@university.edu`,
      role: ["Lead", "Researcher", "Developer", "Manager"][i % 4]
    }
  ],
  contacts: {
    primaryPhone: `+25078${Math.floor(100000 + Math.random() * 900000)}`,
    primaryEmail: `contact${i + 1}@university.edu`
  },
  
  // Classification
  fieldOfInnovation: ["Agriculture", "Health", "ICT", "Energy"][i % 4],
  subField: ["Subfield A", "Subfield B", "Subfield C", "Subfield D"][i % 4],
  intellectualProperty: [
    {
      type: ["Patent", "Copyright", "Trademark"][i % 3],
      status: ["Pending", "Granted", "Not Applicable"][i % 3]
    }
  ],
  
  // Support & Funding
  pastFunding: {
    received: i % 2 === 0,
    funders: i % 2 === 0 ? ["University", "Government"] : [], // Ensure array
    supportTypes: ["Grant", "Investment", "Donation"],
    yearBegan: 2020 + (i % 3),
    duration: 1 + (i % 3),
    amount: 10000 + (i * 2000)
  },
  futureFundingNeeded: i % 3 !== 0,
  
  // Documents
  documents: [
    {
      type: "Proposal",
      name: `Project_${i + 1}_Proposal.pdf`,
      url: "#"
    },
    {
      type: "Report",
      name: `Project_${i + 1}_Report.pdf`,
      url: "#"
    }
  ]
}));