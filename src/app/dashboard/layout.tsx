'use client';

import type React from "react";
import { ReusableSidebar, SidebarConfig } from "@/components/global/reusable-sidebar";
import { Users, Settings, Sun, Globe, LogOut, BarChart3, FolderKanban, ListTodo, FileText, LineChart } from "lucide-react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentPath = pathname;
  const dashboardSidebarConfig: SidebarConfig = {
    user: {
      name: "John Doe",
      role: "Project Manager",
      avatar: "/placeholder.svg?height=64&width=64&text=JD",
      systemName: process.env.NEXT_PUBLIC_SYSTEM_NAME ?? "Kangalos",
    },
    navigationGroups: [
      {
        label: "Management",
        items: [
          {
            title: "Dashboard",
            url: "/dashboard",
            icon: BarChart3,
          },
          {
            title: "Projects",
            url: "/dashboard/projectPage",
            icon: FolderKanban,
          },
          {
            title: "Tasks",
            url: "/dashboard/tasks",
            icon: ListTodo,
          },
          {
            title: "Users",
            url: "/dashboard/users",
            icon: Users,
          },
          {
            title: "UserRoles",
            url: "/dashboard/user-roles",
            icon: Users,
          },
          {
            title: "UserPositions",
            url: "/dashboard/user-positions",
            icon: Users,
          },
          {
            title: "OrganisationUnits",
            url: "/dashboard/organisation-units",
            icon: Users, // Placeholder icon, replace with a more suitable one if available
          },
          {
            title: "Roles",
            url: "/dashboard/roles",
            icon: Users, // Placeholder icon
          },
          {
            title: "Permissions",
            url: "/dashboard/permissions",
            icon: Users, // Placeholder icon
          },
          {
            title: "Positions",
            url: "/dashboard/positions",
            icon: Users,
          },
          {
            title: "Categories",
            url: "/dashboard/categories",
            icon: Users,
          },
          {
            title: "Attachments",
            url: "/dashboard/attachments",
            icon: Users,
          },
          {
            title: "Funders",
            url: "/dashboard/funders",
            icon: Users, // Placeholder icon
          },
          {
            title: "Stakeholders",
            url: "/dashboard/stakeholders",
            icon: Users, // Placeholder icon
          },
          {
            title: "Startups",
            url: "/dashboard/startups",
            icon: Users, // Placeholder icon
          },
          {
            title: "SDGs",
            url: "/dashboard/sdgs",
            icon: Users, // Placeholder icon
          },
        ],
      },
      {
        label: "Reporting",
        items: [
          {
            title: "Reports",
            url: "/dashboard/reports",
            icon: FileText,
          },
          {
            title: "Analytics",
            url: "/dashboard/analytics",
            icon: LineChart,
          },
          {
            title: "ProjectReports",
            url: "/dashboard/project-reports",
            icon: FileText,
          },
          {
            title: "ProjectStakeholders",
            url: "/dashboard/project-stakeholders",
            icon: Users,
          },
          {
            title: "ProjectFunders",
            url: "/dashboard/project-funders",
            icon: Users,
          },
          {
            title: "ProjectAuthors",
            url: "/dashboard/project-authors",
            icon: Users,
          },
          {
            title: "ProjectEvaluations",
            url: "/dashboard/project-evaluations",
            icon: Users,
          },
          {
            title: "Evaluations",
            url: "/dashboard/evaluations",
            icon: Users,
          },
        ],
      },
    ],
    footerActions: [
      {
        icon: Sun,
        label: "Theme",
        items: [
          { label: "Light", action: "light" },
          { label: "Dark", action: "dark" },
        ],
      },
      {
        icon: Globe,
        label: "Language",
        items: [{ label: "English", action: "en" }],
      },
      {
        icon: Settings,
        label: "Settings",
        items: [{ label: "Preferences", action: "preferences" }],
      },
      {
        icon: LogOut,
        label: "Logout",
        items: [{ label: "Sign Out", action: "logout" }],
      },
    ],
    notifications: [],
  };
  return (
    <ReusableSidebar config={dashboardSidebarConfig} currentPath={currentPath}>
      <div className="px-6 h-full">
        {children}
      </div>
    </ReusableSidebar>
  );
}
