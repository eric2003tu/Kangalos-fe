"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Project } from "@/lib/projects";
import { useParams } from "next/navigation";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { ProjectCardMenu } from "./ProjectCardMenu";

interface ProjectCardProps {
  project: Project;
  onUpdate?: (project: Project) => void;
  onDelete?: (projectId: number) => void;
}

export function ProjectCard({ project, onUpdate, onDelete }: ProjectCardProps) {
  const params = useParams();
  const locale = params?.locale || 'en';
  const projectUrl = `/dashboard/projectPage/${project.id}`;
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleUpdate = () => {
    setIsMenuOpen(false);
    onUpdate?.(project);
  };

  const handleDelete = () => {
    setIsMenuOpen(false);
    onDelete?.(project.id);
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-all duration-200 ease-in-out hover:scale-[1.02] transform origin-center relative">
      <div className="flex justify-between items-start mb-2">
        <Badge variant="outline" className="text-xs">
          {project.university}
        </Badge>
        <button
          onClick={handleMenuToggle}
          className="text-gray-500 transition-colors hover:bg-blue-500 hover:text-white cursor-pointer p-2 rounded-lg"
          aria-label="Project options"
          aria-haspopup="true"
          aria-expanded={isMenuOpen}
        >
          <MoreVertical size={25} className="h-4 w-4 cursor-pointer" />
        </button>
      </div>
      
      <Link href={projectUrl}>
        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
        <p className="text-sm font-medium text-gray-700 mb-2">
          {project.category}
        </p>
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div>
            <Badge variant={project.status === "New" ? "default" : "secondary"}>
              {project.status}
            </Badge>
            <p className="text-sm text-gray-700 mt-2">
              Amount: ${project.amount.toLocaleString()}
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-blue-600 border-blue-600 cursor-pointer"
          >
            View Details
          </Button>
        </div>
      </Link>

      {isMenuOpen && (
        <ProjectCardMenu
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onClose={() => setIsMenuOpen(false)}
          projectid={project.id}
        />
      )}
    </div>
  );
}

// 4. Update your sample data to fix funders array issue
export const sampleProjects: Project[] = Array.from({ length: 10 }, (_, i) => ({
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
  
  // Support & Funding - FIX: Wrap single strings in arrays
  pastFunding: {
    received: i % 2 === 0,
    funders: [["University", "Government", "NGO"][i % 3]], // ✅ Wrapped in array
    supportTypes: [["Grant", "Investment", "Donation"][i % 3]], // ✅ Wrapped in array
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
