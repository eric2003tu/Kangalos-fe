"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import { createProjectSchema, type CreateProjectForm } from "../schemas/projectSchemas";
import { z } from "zod";
import { useCreateProject } from "../hooks/useProjectHooks";
import { useCreateProjectAuthor } from "@/features/project-authors/hooks/useProjectAuthorHooks";
import { useAddProjectStakeholder } from "@/features/project-stakeholders/hooks/useProjectStakeholderHooks";
import { useCreateProjectFunder } from "@/features/project-funders/hooks/useProjectFunderHooks";
import { useCreateAttachment } from "@/features/attachments/hooks/useAttachmentHooks";
import { useCreateEvaluationForProject } from "@/features/project-evaluations/hooks/useProjectEvaluationHooks";
import { useCreateReportForProject } from "@/features/project-reports/hooks/useProjectReportHooks";
import { useCreateStartup } from "@/features/startups/hooks/useStartupHooks";
import OrganisationUnitSelect from "@/features/roles/components/OrganisationUnitSelect";
import UserSelect from "@/features/users/components/UserSelect";
import StakeholderSelect from "@/features/stakeholders/components/StakeholderSelect";
import FunderSelect from "@/features/funders/components/FunderSelect";
import { createProjectAuthorSchema } from "@/features/project-authors/schemas/projectAuthorSchemas";
import { createProjectStakeholderSchema } from "@/features/project-stakeholders/schemas/projectStakeholderSchemas";
import { createProjectFunderSchema } from "@/features/project-funders/schemas/projectFunderSchemas";
import { createAttachmentSchema } from "@/features/attachments/schemas/attachmentSchemas";
import { createProjectEvaluationSchema } from "@/features/project-evaluations/schemas/projectEvaluationSchemas";
import { createProjectReportSchema } from "@/features/project-reports/schemas/projectReportSchemas";
import { createStartupSchema } from "@/features/startups/schemas/startupSchemas";
import type { AuthorRole } from "@/features/project-authors/types/projectAuthorTypes";
import type { StakeholderRole } from "@/features/project-stakeholders/types/projectStakeholderTypes";
import type { IpType, ProjectStatus } from "../types/projectTypes";
import {
  FileText,
  Users,
  Handshake,
  DollarSign,
  Paperclip,
  Star,
  FileBarChart,
  Rocket,
  Plus,
  Trash2,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

interface AuthorForm {
  userId: string;
  role: AuthorRole | "";
}

interface StakeholderForm {
  stakeholderId: string;
  role: StakeholderRole | "";
}

interface FunderForm {
  funderId: string;
  amount?: number;
}

interface AttachmentForm {
  uploaderId: string;
  filename: string;
  url: string;
}

interface EvaluationForm {
  evaluatorId: string;
  score: number;
  comments?: string;
}

interface ReportForm {
  title: string;
  content?: string;
  submittedById: string;
}

interface StartupForm {
  name: string;
  description?: string;
  year: number;
  registered: boolean;
}

const stepConfig = [
  {
    title: "Project Details",
    description: "Basic project information",
    icon: FileText,
  },
  {
    title: "Authors",
    description: "Add project authors",
    icon: Users,
  },
  {
    title: "Stakeholders",
    description: "Define stakeholders",
    icon: Handshake,
  },
  {
    title: "Funders",
    description: "Add funding sources",
    icon: DollarSign,
  },
  {
    title: "Attachments",
    description: "Upload documents",
    icon: Paperclip,
  },
  {
    title: "Evaluations",
    description: "Project evaluations",
    icon: Star,
  },
  {
    title: "Reports",
    description: "Project reports",
    icon: FileBarChart,
  },
  {
    title: "Startup Info",
    description: "Startup details",
    icon: Rocket,
  },
];

export default function ProjectWizard() {
  const t = useTranslations("projects");
  const [step, setStep] = useState(0);
  const totalSteps = 8;
  const [projectId, setProjectId] = useState<string | null>(null);

  const createProjectMutation = useCreateProject();
  const createAuthorMutation = useCreateProjectAuthor();
  const createStakeholder = useAddProjectStakeholder(projectId || "");
  const createFunder = useCreateProjectFunder();
  const createAttachment = useCreateAttachment();
  const createEvaluation = useCreateEvaluationForProject(projectId || "");
  const createReport = useCreateReportForProject(projectId || "");
  const createStartup = useCreateStartup();

  const form = useForm<CreateProjectForm & { sdgs?: string; }>({
    resolver: zodResolver(createProjectSchema.extend({ sdgs: z.string().optional() })),
    defaultValues: {
      title: "",
      titleNorm: "",
      projectType: "",
      year: new Date().getFullYear(),
      organisationUnitId: "",
      abstract: "",
      innovationField: "",
      expectedIp: undefined,
      progressPercent: undefined,
      status: undefined,
      submittedAt: undefined,
      sdgs: "",
    },
  });

  const [authors, setAuthors] = useState<AuthorForm[]>([]);
  const [author, setAuthor] = useState<AuthorForm>({ userId: "", role: "" });
  const [stakeholders, setStakeholders] = useState<StakeholderForm[]>([]);
  const [stakeholder, setStakeholder] = useState<StakeholderForm>({ stakeholderId: "", role: "" });
  const [funders, setFunders] = useState<FunderForm[]>([]);
  const [funder, setFunder] = useState<FunderForm>({ funderId: "", amount: undefined });
  const [attachments, setAttachments] = useState<AttachmentForm[]>([]);
  const [attachment, setAttachment] = useState<AttachmentForm>({ uploaderId: "", filename: "", url: "" });
  const [evaluations, setEvaluations] = useState<EvaluationForm[]>([]);
  const [evaluation, setEvaluation] = useState<EvaluationForm>({ evaluatorId: "", score: 0, comments: "" });
  const [report, setReport] = useState<ReportForm>({ title: "", content: "", submittedById: "" });
  const [startup, setStartup] = useState<StartupForm>({
    name: "",
    description: "",
    year: new Date().getFullYear(),
    registered: false,
  });

  const handleNext = async () => {
    if (step === 0) {
      const values = form.getValues();
      const res = await createProjectMutation.mutateAsync({
        title: values.title,
        titleNorm: values.titleNorm,
        projectType: values.projectType,
        year: values.year,
        organisationUnitId: values.organisationUnitId,
        abstract: values.abstract,
        innovationField: values.innovationField,
        expectedIp: values.expectedIp as IpType,
        progressPercent: values.progressPercent,
        status: values.status as ProjectStatus,
        submittedAt: values.submittedAt,
      });
      setProjectId(res.id);
    }
    if (step === 1 && projectId) {
      await Promise.all(
        authors.map((a) =>
          createAuthorMutation.mutateAsync({
            projectId,
            userId: a.userId,
            role: a.role as AuthorRole,
          }),
        ),
      );
    }
    if (step === 2 && projectId) {
      await Promise.all(
        stakeholders.map((s) =>
          createStakeholder.mutateAsync({
            stakeholderId: s.stakeholderId,
            role: s.role as StakeholderRole,
          }),
        ),
      );
    }
    if (step === 3 && projectId) {
      await Promise.all(
        funders.map((f) =>
          createFunder.mutateAsync({
            projectId,
            funderId: f.funderId,
            amount: f.amount,
          }),
        ),
      );
    }
    if (step === 4 && projectId) {
      await Promise.all(
        attachments.map((a) =>
          createAttachment.mutateAsync({
            projectId,
            uploaderId: a.uploaderId,
            filename: a.filename,
            url: a.url,
          }),
        ),
      );
    }
    if (step === 5 && projectId) {
      await Promise.all(
        evaluations.map((e) =>
          createEvaluation.mutateAsync({
            projectId,
            evaluatorId: e.evaluatorId,
            score: e.score,
            comments: e.comments,
            status: "COMPLETED",
          }),
        ),
      );
    }
    if (step === 6 && projectId) {
      const parsed = reportSchema.safeParse(report);
      if (parsed.success) {
        await createReport.mutateAsync(parsed.data);
      }
    }
    if (step === 7 && projectId) {
      const parsed = startupSchema.safeParse(startup);
      if (parsed.success) {
        await createStartup.mutateAsync({ ...parsed.data, projectId });
      }
    }
    setStep((s) => s + 1);
  };

  const handleBack = () => setStep((s) => (s > 0 ? s - 1 : s));

  const authorSchema = createProjectAuthorSchema.omit({ projectId: true }).required();
  const addAuthor = () => {
    const parsed = authorSchema.safeParse(author);
    if (!parsed.success) return;
    setAuthors((arr) => [...arr, parsed.data]);
    setAuthor({ userId: "", role: "" });
  };

  const removeAuthor = (index: number) => {
    setAuthors((arr) => arr.filter((_, i) => i !== index));
  };

  const stakeholderSchema = createProjectStakeholderSchema.required();
  const addStakeholder = () => {
    const parsed = stakeholderSchema.safeParse(stakeholder);
    if (!parsed.success) return;
    setStakeholders((arr) => [...arr, parsed.data]);
    setStakeholder({ stakeholderId: "", role: "" });
  };

  const removeStakeholder = (index: number) => {
    setStakeholders((arr) => arr.filter((_, i) => i !== index));
  };

  const funderSchema = createProjectFunderSchema.omit({ projectId: true });
  const addFunder = () => {
    const parsed = funderSchema.safeParse(funder);
    if (!parsed.success) return;
    setFunders((arr) => [...arr, parsed.data]);
    setFunder({ funderId: "", amount: undefined });
  };

  const removeFunder = (index: number) => {
    setFunders((arr) => arr.filter((_, i) => i !== index));
  };

  const attachmentSchema = createAttachmentSchema.omit({
    projectId: true,
    fileType: true,
    fileSize: true,
    metadata: true,
  });
  const addAttachment = () => {
    const parsed = attachmentSchema.safeParse(attachment);
    if (!parsed.success) return;
    setAttachments((arr) => [...arr, parsed.data]);
    setAttachment({ uploaderId: "", filename: "", url: "" });
  };

  const removeAttachment = (index: number) => {
    setAttachments((arr) => arr.filter((_, i) => i !== index));
  };

  const evaluationSchema = createProjectEvaluationSchema.omit({
    projectId: true,
    status: true,
  });
  const addEvaluation = () => {
    const parsed = evaluationSchema.safeParse(evaluation);
    if (!parsed.success) return;
    setEvaluations((arr) => [...arr, parsed.data]);
    setEvaluation({ evaluatorId: "", score: 0, comments: "" });
  };

  const removeEvaluation = (index: number) => {
    setEvaluations((arr) => arr.filter((_, i) => i !== index));
  };

  const reportSchema = createProjectReportSchema.omit({ projectId: true });
  const startupSchema = createStartupSchema.omit({ projectId: true });

  const renderStep = () => {
    const currentStep = stepConfig[step];
    const Icon = currentStep?.icon || FileText;

    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{currentStep.title}</h3>
                <p className="text-sm text-muted-foreground">{currentStep.description}</p>
              </div>
            </div>

            <Form {...form}>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">{t("form.title")}</FormLabel>
                        <FormControl>
                          <Input {...field} className="h-10" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="titleNorm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">{t("form.titleNorm")}</FormLabel>
                        <FormControl>
                          <Input {...field} className="h-10" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">{t("form.projectType")}</FormLabel>
                        <FormControl>
                          <Input {...field} className="h-10" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">{t("form.year")}</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} className="h-10" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="organisationUnitId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">{t("form.organisationUnitId")}</FormLabel>
                      <FormControl>
                        <OrganisationUnitSelect value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="abstract"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">{t("form.abstract")}</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="min-h-[100px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="innovationField"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">{t("form.innovationField")}</FormLabel>
                        <FormControl>
                          <Input {...field} className="h-10" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sdgs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">{t("wizard.form.sdgs")}</FormLabel>
                        <FormControl>
                          <Input {...field} className="h-10" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <Icon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{currentStep.title}</h3>
                <p className="text-sm text-muted-foreground">{currentStep.description}</p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Add Author</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <UserSelect
                      value={author.userId}
                      onChange={(id) => setAuthor({ ...author, userId: id || "" })}
                      placeholder={t("wizard.form.authorUser") as string}
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder={t("wizard.form.authorRole") as string}
                      value={author.role}
                      onChange={(e) => setAuthor({ ...author, role: e.target.value as AuthorRole })}
                      className="h-10"
                    />
                  </div>
                  <Button type="button" onClick={addAuthor} size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    {t("actions.add")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {authors.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Authors ({authors.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {authors.map((a, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-1 bg-green-100 rounded">
                            <Users className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{a.userId}</p>
                            <Badge variant="secondary" className="text-xs">
                              {a.role}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAuthor(i)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Icon className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{currentStep.title}</h3>
                <p className="text-sm text-muted-foreground">{currentStep.description}</p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Add Stakeholder</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <StakeholderSelect
                      value={stakeholder.stakeholderId}
                      onChange={(id) => setStakeholder({ ...stakeholder, stakeholderId: id || "" })}
                      placeholder={t("wizard.form.stakeholder") as string}
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder={t("wizard.form.stakeholderRole") as string}
                      value={stakeholder.role}
                      onChange={(e) =>
                        setStakeholder({
                          ...stakeholder,
                          role: e.target.value as StakeholderRole,
                        })
                      }
                      className="h-10"
                    />
                  </div>
                  <Button type="button" onClick={addStakeholder} size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    {t("actions.add")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {stakeholders.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Stakeholders ({stakeholders.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stakeholders.map((s, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-1 bg-purple-100 rounded">
                            <Handshake className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{s.stakeholderId}</p>
                            <Badge variant="secondary" className="text-xs">
                              {s.role}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeStakeholder(i)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Icon className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{currentStep.title}</h3>
                <p className="text-sm text-muted-foreground">{currentStep.description}</p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Add Funder</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <FunderSelect
                      value={funder.funderId}
                      onChange={(id) => setFunder({ ...funder, funderId: id || "" })}
                      placeholder={t("wizard.form.funder") as string}
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder={t("wizard.form.funderAmount") as string}
                      type="number"
                      value={funder.amount ?? ""}
                      onChange={(e) => setFunder({ ...funder, amount: Number(e.target.value) })}
                      className="h-10"
                    />
                  </div>
                  <Button type="button" onClick={addFunder} size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    {t("actions.add")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {funders.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Funders ({funders.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {funders.map((f, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-1 bg-yellow-100 rounded">
                            <DollarSign className="h-4 w-4 text-yellow-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{f.funderId}</p>
                            <Badge variant="secondary" className="text-xs">
                              ${f.amount?.toLocaleString() ?? 0}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFunder(i)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Icon className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{currentStep.title}</h3>
                <p className="text-sm text-muted-foreground">{currentStep.description}</p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Add Attachment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <UserSelect
                    value={attachment.uploaderId}
                    onChange={(id) => setAttachment({ ...attachment, uploaderId: id || "" })}
                    placeholder={t("wizard.form.attachmentUploader") as string}
                  />
                  <div className="flex gap-3">
                    <Input
                      placeholder={t("wizard.form.attachmentFilename") as string}
                      value={attachment.filename}
                      onChange={(e) => setAttachment({ ...attachment, filename: e.target.value })}
                      className="h-10"
                    />
                    <Input
                      placeholder={t("wizard.form.attachmentUrl") as string}
                      value={attachment.url}
                      onChange={(e) => setAttachment({ ...attachment, url: e.target.value })}
                      className="h-10"
                    />
                  </div>
                  <Button type="button" onClick={addAttachment} size="sm" className="w-full">
                    <Plus className="h-4 w-4 mr-1" />
                    {t("actions.add")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {attachments.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Attachments ({attachments.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {attachments.map((a, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-1 bg-orange-100 rounded">
                            <Paperclip className="h-4 w-4 text-orange-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{a.filename}</p>
                            <p className="text-xs text-muted-foreground truncate max-w-[200px]">{a.url}</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAttachment(i)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Icon className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{currentStep.title}</h3>
                <p className="text-sm text-muted-foreground">{currentStep.description}</p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Add Evaluation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <UserSelect
                    value={evaluation.evaluatorId}
                    onChange={(id) => setEvaluation({ ...evaluation, evaluatorId: id || "" })}
                    placeholder={t("wizard.form.evaluationEvaluator") as string}
                  />
                  <div className="flex gap-3">
                    <Input
                      placeholder={t("wizard.form.evaluationScore") as string}
                      type="number"
                      min="0"
                      max="10"
                      value={evaluation.score}
                      onChange={(e) => setEvaluation({ ...evaluation, score: Number(e.target.value) })}
                      className="h-10"
                    />
                    <Input
                      placeholder={t("wizard.form.evaluationComments") as string}
                      value={evaluation.comments}
                      onChange={(e) => setEvaluation({ ...evaluation, comments: e.target.value })}
                      className="h-10"
                    />
                  </div>
                  <Button type="button" onClick={addEvaluation} size="sm" className="w-full">
                    <Plus className="h-4 w-4 mr-1" />
                    {t("actions.add")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {evaluations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Evaluations ({evaluations.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {evaluations.map((e, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-1 bg-indigo-100 rounded">
                            <Star className="h-4 w-4 text-indigo-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{e.evaluatorId}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                Score: {e.score}/10
                              </Badge>
                              {e.comments && (
                                <p className="text-xs text-muted-foreground truncate max-w-[150px]">{e.comments}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEvaluation(i)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-teal-100 rounded-lg">
                <Icon className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{currentStep.title}</h3>
                <p className="text-sm text-muted-foreground">{currentStep.description}</p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Project Report</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Report Title</label>
                  <Input
                    placeholder={t("wizard.form.reportTitle") as string}
                    value={report.title}
                    onChange={(e) => setReport({ ...report, title: e.target.value })}
                    className="h-10"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Report Content</label>
                  <Textarea
                    placeholder={t("wizard.form.reportContent") as string}
                    value={report.content}
                    onChange={(e) => setReport({ ...report, content: e.target.value })}
                    className="min-h-[120px]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Submitted By</label>
                  <UserSelect
                    value={report.submittedById}
                    onChange={(id) => setReport({ ...report, submittedById: id || "" })}
                    placeholder={t("wizard.form.reportSubmittedBy") as string}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Icon className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{currentStep.title}</h3>
                <p className="text-sm text-muted-foreground">{currentStep.description}</p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Startup Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Startup Name</label>
                  <Input
                    placeholder={t("wizard.form.startupName") as string}
                    value={startup.name}
                    onChange={(e) => setStartup({ ...startup, name: e.target.value })}
                    className="h-10"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    placeholder={t("wizard.form.startupDescription") as string}
                    value={startup.description}
                    onChange={(e) => setStartup({ ...startup, description: e.target.value })}
                    className="min-h-[100px]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Year</label>
                  <Input
                    placeholder={t("wizard.form.startupYear") as string}
                    type="number"
                    value={startup.year}
                    onChange={(e) => setStartup({ ...startup, year: Number(e.target.value) })}
                    className="h-10"
                  />
                </div>
                <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                  <Checkbox
                    checked={startup.registered}
                    onCheckedChange={(v) => setStartup({ ...startup, registered: v === true })}
                  />
                  <label className="text-sm font-medium">{t("wizard.form.startupRegistered")}</label>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t("wizard.completed")}</h3>
            <p className="text-muted-foreground">{t("wizard.finishMessage")}</p>
          </div>
        );
    }
  };

  const isLastStep = step === totalSteps - 1;
  const isCompleted = step >= totalSteps;
  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Project Creation Wizard</h1>
        <p className="text-muted-foreground">
          Follow the steps below to create your project with all necessary details.
        </p>
      </div>

      {!isCompleted && (
        <>
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">
                Step {step + 1} of {totalSteps}
              </span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Indicators */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {stepConfig.map((stepItem, index) => {
                const isActive = index === step;
                const isCompleted = index < step;
                const Icon = stepItem.icon;

                return (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${isCompleted
                        ? "bg-green-100 text-green-600"
                        : isActive
                          ? "bg-blue-100 text-blue-600"
                          : "bg-muted text-muted-foreground"
                        }`}
                    >
                      {isCompleted ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                    </div>
                    <div className="text-center">
                      <p className={`text-xs font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                        {stepItem.title}
                      </p>
                    </div>
                    {index < stepConfig.length - 1 && (
                      <div className="hidden md:block absolute h-px bg-border w-full top-5 left-1/2 -z-10" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Step Content */}
      <Card className="mb-8">
        <CardContent className="p-8">{renderStep()}</CardContent>
      </Card>

      {/* Navigation */}
      {!isCompleted && (
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={step === 0}
            className="flex items-center gap-2 bg-transparent"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("actions.back")}
          </Button>
          <Button type="button" onClick={handleNext} className="flex items-center gap-2">
            {isLastStep ? (
              <>
                <CheckCircle className="h-4 w-4" />
                {t("actions.finish")}
              </>
            ) : (
              <>
                {t("actions.next")}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
