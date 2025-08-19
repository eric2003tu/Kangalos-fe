"use client";

import {
  BarChart3,
  FolderKanban,
  ListTodo,
  Users,
  UserCheck,
  Briefcase,
  Building2,
  Shield,
  Key,
  GraduationCap,
  Tags,
  Paperclip,
  Banknote,
  Handshake,
  Rocket,
  Target,
  FileText,
  LineChart,
  FileBarChart,
  UsersRound,
  CreditCard,
  PenTool,
  ClipboardCheck,
  Star,
} from "lucide-react";
import { DashboardCard } from "@/components/global/dashboard-card";

const navigationData = {
  navigationGroups: [
    {
      label: "Management",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard/home",
          icon: BarChart3,
          description: "Overview of all platform activities and key metrics",
          tooltipContent:
            "Get a comprehensive view of your project management platform with real-time statistics, recent activities, and performance indicators across all university projects and initiatives.",
          iconColor: "text-blue-600",
          count: 1,
        },
        {
          title: "Projects",
          url: "/dashboard/projectPage",
          icon: FolderKanban,
          description: "Manage research projects and innovation initiatives",
          tooltipContent:
            "Central hub for all university research projects, student theses, and innovation initiatives. Create, track, and manage projects from proposal to completion with full lifecycle visibility.",
          iconColor: "text-green-600",
          count: 36,
        },
        {
          title: "Tasks",
          url: "/dashboard/tasks",
          icon: ListTodo,
          description: "Track project tasks and milestones",
          tooltipContent:
            "Organize and monitor project tasks, set milestones, assign responsibilities, and track progress across all active projects with deadline management and priority settings.",
          iconColor: "text-orange-600",
          count: 1834,
        },
        {
          title: "Users",
          url: "/dashboard/users",
          icon: Users,
          description: "Manage platform users and access",
          tooltipContent:
            "Comprehensive user management system for students, faculty, researchers, and external partners. Handle user registration, profile management, and access control across the platform.",
          iconColor: "text-purple-600",
          count: 892,
        },
        {
          title: "User Roles",
          url: "/dashboard/user-roles",
          icon: UserCheck,
          description: "Assign and manage user roles",
          tooltipContent:
            "Define and assign specific roles to users such as project lead, supervisor, reviewer, or administrator. Control what each user can access and modify within the system.",
          iconColor: "text-indigo-600",
          count: 156,
        },
        {
          title: "User Positions",
          url: "/dashboard/user-positions",
          icon: Briefcase,
          description: "Manage academic and staff positions",
          tooltipContent:
            "Track and manage user positions within the university hierarchy including academic titles, administrative roles, and external partner designations.",
          iconColor: "text-teal-600",
          count: 78,
        },
        {
          title: "Organisation Units",
          url: "/dashboard/organisation-units",
          icon: Building2,
          description: "University structure and departments",
          tooltipContent:
            "Manage the university's organizational structure including colleges, schools, centers, and departments. Define hierarchies and reporting relationships for proper project categorization.",
          iconColor: "text-slate-600",
          count: 24,
        },
        {
          title: "Roles",
          url: "/dashboard/roles",
          icon: Shield,
          description: "Define system roles and permissions",
          tooltipContent:
            "Create and configure system-wide roles with specific permission sets. Define what actions each role can perform and which areas of the platform they can access.",
          iconColor: "text-red-600",
          count: 12,
        },
        {
          title: "Permissions",
          url: "/dashboard/permissions",
          icon: Key,
          description: "Manage access permissions and security",
          tooltipContent:
            "Fine-grained permission management system controlling access to features, data, and administrative functions. Ensure proper security and data protection across the platform.",
          iconColor: "text-yellow-600",
          count: 45,
        },
        {
          title: "Positions",
          url: "/dashboard/positions",
          icon: GraduationCap,
          description: "Academic and administrative positions",
          tooltipContent:
            "Define and manage various positions within the university including faculty ranks, administrative titles, and research positions with associated responsibilities and privileges.",
          iconColor: "text-emerald-600",
          count: 67,
        },
        {
          title: "Categories",
          url: "/dashboard/categories",
          icon: Tags,
          description: "Project categorization and tagging",
          tooltipContent:
            "Create and manage project categories, tags, and classification systems. Organize projects by research field, innovation type, funding source, or custom criteria for better discoverability.",
          iconColor: "text-pink-600",
          count: 89,
        },
        {
          title: "Attachments",
          url: "/dashboard/attachments",
          icon: Paperclip,
          description: "File and document management",
          tooltipContent:
            "Centralized file management system for project documents, research papers, presentations, datasets, and other attachments with version control and secure access.",
          iconColor: "text-cyan-600",
          count: 3421,
        },
        {
          title: "Funders",
          url: "/dashboard/funders",
          icon: Banknote,
          description: "Funding organizations and sponsors",
          tooltipContent:
            "Manage relationships with funding organizations, government agencies, private sponsors, and international donors. Track funding opportunities and application processes.",
          iconColor: "text-lime-600",
          count: 34,
        },
        {
          title: "Stakeholders",
          url: "/dashboard/stakeholders",
          icon: Handshake,
          description: "Project partners and stakeholders",
          tooltipContent:
            "Maintain comprehensive stakeholder database including community partners, industry collaborators, government agencies, and beneficiaries involved in university projects.",
          iconColor: "text-violet-600",
          count: 156,
        },
        {
          title: "Startups",
          url: "/dashboard/startups",
          icon: Rocket,
          description: "Spin-off companies and ventures",
          tooltipContent:
            "Track and manage startup companies and commercial ventures that emerge from university research projects and student innovations, including incubation support and progress monitoring.",
          iconColor: "text-rose-600",
          count: 23,
        },
        {
          title: "SDGs",
          url: "/dashboard/sdgs",
          icon: Target,
          description: "UN Sustainable Development Goals",
          tooltipContent:
            "Align university projects with UN Sustainable Development Goals for impact measurement and reporting. Track contributions to global sustainability objectives and social impact.",
          iconColor: "text-blue-500",
          count: 17,
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
          description: "Generate comprehensive project reports",
          tooltipContent:
            "Create detailed reports on project progress, outcomes, and impact. Generate custom reports for different stakeholders including funders, university administration, and government agencies.",
          iconColor: "text-blue-700",
          count: 145,
        },
        {
          title: "Analytics",
          url: "/dashboard/analytics",
          icon: LineChart,
          description: "Data analysis and insights dashboard",
          tooltipContent:
            "Advanced analytics dashboard with charts, trends, and insights about project performance, funding utilization, success rates, and institutional research productivity.",
          iconColor: "text-green-700",
          count: 8,
        },
        {
          title: "Project Reports",
          url: "/dashboard/project-reports",
          icon: FileBarChart,
          description: "Individual project reporting",
          tooltipContent:
            "Detailed reporting for individual projects including progress updates, milestone achievements, budget utilization, and outcome documentation with timeline visualization.",
          iconColor: "text-orange-700",
          count: 312,
        },
        {
          title: "Project Stakeholders",
          url: "/dashboard/project-stakeholders",
          icon: UsersRound,
          description: "Stakeholder relationship mapping",
          tooltipContent:
            "Visualize and manage stakeholder relationships for each project including partners, beneficiaries, sponsors, and collaborators with engagement tracking and communication logs.",
          iconColor: "text-purple-700",
          count: 567,
        },
        {
          title: "Project Funders",
          url: "/dashboard/project-funders",
          icon: CreditCard,
          description: "Project funding tracking and analysis",
          tooltipContent:
            "Comprehensive funding analysis for projects including funding sources, amounts, disbursement schedules, utilization rates, and financial performance metrics.",
          iconColor: "text-indigo-700",
          count: 89,
        },
        {
          title: "Project Authors",
          url: "/dashboard/project-authors",
          icon: PenTool,
          description: "Authorship and contribution tracking",
          tooltipContent:
            "Track and manage project authorship, contributor roles, and intellectual property rights. Maintain clear records of who contributed what to each project for proper attribution.",
          iconColor: "text-teal-700",
          count: 423,
        },
        {
          title: "Project Evaluations",
          url: "/dashboard/project-evaluations",
          icon: ClipboardCheck,
          description: "Project evaluation results and scoring",
          tooltipContent:
            "Review and analyze project evaluation results including peer reviews, committee assessments, and performance scores with detailed feedback and recommendations.",
          iconColor: "text-red-700",
          count: 198,
        },
        {
          title: "Evaluations",
          url: "/dashboard/evaluations",
          icon: Star,
          description: "Evaluation criteria and scoring system",
          tooltipContent:
            "Manage evaluation criteria, scoring rubrics, and assessment frameworks used for project reviews. Configure evaluation processes and reviewer assignments.",
          iconColor: "text-yellow-700",
          count: 45,
        },
      ],
    },
  ],
};

export default function DashboardHomePage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Kangalos Dashboard</h1>
        <p className="text-muted-foreground text-base sm:text-lg">University of Rwanda Project Management Platform</p>
      </div>

      {navigationData.navigationGroups.map((group) => (
        <div key={group.label} className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">{group.label}</h2>
            <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {group.items.map((item) => (
              <DashboardCard
                key={item.title}
                title={item.title}
                description={item.description}
                tooltipContent={item.tooltipContent}
                icon={item.icon}
                iconColor={item.iconColor}
                url={item.url}
                count={item.count}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
