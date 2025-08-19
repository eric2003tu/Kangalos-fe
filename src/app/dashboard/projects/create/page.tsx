"use client";

import { ProjectList } from "@/features/projects/2-components/project-list/ProjectList";

const Index = () => {

  return (
    <>
      <div className="space-y-8">
        <div className="container mx-auto max-w-6xl px-4">
          <ProjectList />
        </div>
      </div>
    </>
  );
};

export default Index;