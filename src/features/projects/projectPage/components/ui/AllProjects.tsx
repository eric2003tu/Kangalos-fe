"use client";import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';
import { Pagination } from "@/features/projects/projectPage/components/ui/Pagination";
import { FilterSection } from "@/features/projects/projectPage/components/ui/FilterSection";
import { ProjectCard } from "@/features/projects/projectPage/components/ui/ProjectCard";
import { sampleProjects } from "@/lib/projects";
import Link from "next/link";
import type { Project } from "@/lib/projects";

const PROJECTS_PER_PAGE = 12;

export function AllProjects() {
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedField, setSelectedField] = useState("All Fields");
  const [selectedStatus, setSelectedStatus] = useState("All Projects");
  const [currentPage, setCurrentPage] = useState(1);

    const handleUpdateProject = (paginatedProjects: Project) => {
    console.log("Update project:", paginatedProjects);
    // Add your update logic here
  };

  const handleDeleteProject = (projectId: number) => {
    console.log("Are you sure you want to delete this project?"); 

  };

  // Filter projects based on search and selections
  const filteredProjects = sampleProjects.filter((project) => {
    const searchMatch = 
      searchTerm === "" ||
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    const fieldMatch = 
      selectedField === "All Fields" ||
      project.category.toLowerCase().includes(selectedField.toLowerCase());

    const statusMatch = 
      selectedStatus === "All Projects" ||
      project.status === selectedStatus;

    return searchMatch && fieldMatch && statusMatch;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * PROJECTS_PER_PAGE,
    currentPage * PROJECTS_PER_PAGE
  );

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedField, selectedStatus]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Innovation Projects</h1>
              <div className="flex justify-center">
        <Link href="/dashboard/projectPage/create-project">
          <Button className="px-6 bg-blue-400 hover:bg-blue-600 text-white cursor-pointer py-4">
            Create New Project
          </Button>
        </Link>
      </div></div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-2">
          <p className="text-gray-600">
            Showing {paginatedProjects.length} of {filteredProjects.length} projects
          </p>
          <p className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="mb-8">
        <FilterSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedField={selectedField}
          setSelectedField={setSelectedField}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
      </div>

      {/* Projects Grid */}
      {paginatedProjects.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedProjects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onUpdate={handleUpdateProject}
          onDelete={handleDeleteProject}
        />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500">No projects match your filters</p>
          <Button 
            variant="ghost" 
            className="mt-2 text-blue-600"
            onClick={() => {
              setSearchTerm("");
              setSelectedField("All Fields");
              setSelectedStatus("All Projects");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}