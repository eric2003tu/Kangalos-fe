// app/[locale]/dashboard/projects/[id]/page.tsx
import { ProjectDetails } from "@/features/projects/projectPage/components/ProjectDetails";
import { sampleProjects } from "@/lib/projects";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    // locale: string;
    id: string;
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  // Convert id to number safely
  const projectId = Number(params.id);
  if (isNaN(projectId)) return notFound();

  // Find project
  const project = sampleProjects.find(p => p.id === projectId);
  if (!project) return notFound();

  // Ensure pastFunding.funders is always an array
  const safeProject = {
    ...project,
    pastFunding: {
      ...project.pastFunding,
      funders: Array.isArray(project.pastFunding.funders) 
        ? project.pastFunding.funders 
        : []
    }
  };

  return (
    <div className=" min-h-screen py-8">
      <ProjectDetails project={safeProject} />
    </div>
  );
}