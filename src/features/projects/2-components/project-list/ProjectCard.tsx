import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/projectStorage";
import { Calendar, DollarSign, Users, Target } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => (
  <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-background to-muted/50 border-0 shadow-lg">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    <CardHeader className="relative pb-3">
      <div className="flex items-start justify-between">
        <CardTitle className="text-lg font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {project.projectName}
        </CardTitle>
        {project.year && (
          <Badge variant="secondary" className="flex items-center gap-1 text-xs">
            <Calendar className="h-3 w-3" />
            {project.year}
          </Badge>
        )}
      </div>

      {project.fieldOfInnovation && (
        <Badge variant="outline" className="w-fit text-xs">
          <Target className="h-3 w-3 mr-1" />
          {project.fieldOfInnovation}
        </Badge>
      )}
    </CardHeader>

    <CardContent className="relative space-y-3 pb-4">
      <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
        {project.description || "No description available"}
      </p>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs">
          <DollarSign className="h-3 w-3 text-muted-foreground" />
          <span className={`font-medium ${project.pastFunding?.hasPastFunding ? 'text-success' : 'text-muted-foreground'}`}>
            {project.pastFunding?.hasPastFunding ? "Previously funded" : "Seeking funding"}
          </span>
        </div>

        {project.pastFunding?.hasPastFunding && project.pastFunding?.fundingAmount && (
          <div className="text-xs text-muted-foreground">
            Amount: {project.pastFunding.fundingAmount}
          </div>
        )}

        {project.teamMembers?.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="h-3 w-3" />
            <span>{project.teamMembers.length} team member{project.teamMembers.length > 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
    </CardContent>

    <CardFooter className="relative pt-0">
      <Button asChild className="w-full group-hover:bg-primary group-hover:shadow-lg transition-all">
        <Link href={`/projects/${project.id}`}>
          View Details
        </Link>
      </Button>
    </CardFooter>
  </Card>
);
