import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { ProjectCard } from "./ProjectCard";
import { Search, Filter, FolderOpen } from "lucide-react";
import { Project, getProjects } from "@/lib/projectStorage";
import { INNOVATION_FIELDS } from "../innovation-form/types";

interface ProjectListProps {
  refreshKey?: number;
}

const ITEMS_PER_PAGE = 5;

export const ProjectList = ({ refreshKey = 0 }: ProjectListProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [field, setField] = useState("all");
  const [funding, setFunding] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setProjects(getProjects());
  }, [refreshKey]);

  useEffect(() => {
    setPage(1);
  }, [search, field, funding]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.projectName.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchesField = field === "all" || p.fieldOfInnovation === field;
      const matchesFunding =
        funding === "all" ||
        (funding === "funded" ? p.pastFunding.hasPastFunding : !p.pastFunding.hasPastFunding);
      return matchesSearch && matchesField && matchesFunding;
    });
  }, [projects, search, field, funding]);

  const pageCount = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  useEffect(() => {
    if (page > pageCount) setPage(1);
  }, [pageCount, page]);

  return (
    <div className="space-y-8">
      {/* Header with stats */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Innovation Projects</h2>
          <p className="text-muted-foreground">
            {projects.length} project{projects.length !== 1 ? 's' : ''} submitted
          </p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          <FolderOpen className="h-4 w-4 mr-2" />
          {filtered.length} shown
        </Badge>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-lg p-6 shadow-sm border">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filter Projects</span>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={field} onValueChange={setField}>
            <SelectTrigger className="sm:w-[200px]">
              <SelectValue placeholder="Innovation Field" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Fields</SelectItem>
              {INNOVATION_FIELDS.map((f) => (
                <SelectItem key={f} value={f}>
                  {f}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={funding} onValueChange={setFunding}>
            <SelectTrigger className="sm:w-[160px]">
              <SelectValue placeholder="Funding Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="funded">Has Funding</SelectItem>
              <SelectItem value="not-funded">Seeking Funding</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      {projects.length === 0 ? (
        <div className="text-center py-12 bg-gradient-to-br from-muted/50 to-background rounded-lg border border-dashed">
          <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No projects yet</h3>
          <p className="text-muted-foreground">
            Get started by creating your first innovation project
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 bg-gradient-to-br from-muted/50 to-background rounded-lg border border-dashed">
          <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No matching projects</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or filters
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginated.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {filtered.length > ITEMS_PER_PAGE && (
        <Pagination className="pt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((p) => Math.max(p - 1, 1));
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <span className="flex h-9 w-9 items-center justify-center rounded-md border">
                {page} / {pageCount}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((p) => Math.min(p + 1, pageCount));
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
