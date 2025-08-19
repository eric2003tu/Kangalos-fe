"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  User as UserIcon,
  Mail,
  Phone,
  Calendar,
  Shield,
  Building,
  FolderOpen,
  Edit,
  Trash,
} from "lucide-react"
import {
  useUser,
  useUserRoles,
  useUserPositions,
  useUserProjects,
} from "../hooks/useUserHooks"
import EditUserDialog from "./EditUserDialog"
import DeleteUserDialog from "./DeleteUserDialog"
import { useTranslations } from "next-intl"

interface UserDetailsAndActionsDialogProps {
  userId: string | undefined
  isOpen: boolean
  onClose: () => void
}

export default function UserDetailsAndActionsDialog({
  userId,
  isOpen,
  onClose,
}: UserDetailsAndActionsDialogProps) {
  const t = useTranslations("users")
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const { data: user, isLoading: userLoading } = useUser(userId || "")
  const { data: userRoles, isLoading: rolesLoading } = useUserRoles(userId || "")
  const { data: userPositions, isLoading: positionsLoading } = useUserPositions(
    userId || ""
  )
  const { data: userProjects, isLoading: projectsLoading } = useUserProjects(
    userId || ""
  )

  if (!userId) return null

  const getUserTypeBadge = (userType: string | undefined | null) => {
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      ORGANISATION: "default",
      STUDENT: "secondary",
      STAFF: "outline",
      INDIVIDUAL: "destructive",
    }

    return (
      <Badge variant={variants[userType || ""] || "secondary"}>
        {userType ? t(`userTypes.${userType.toLowerCase()}`) : t("userTypes.unknown")}
      </Badge>
    )
  }

  const getVerificationBadge = (isVerified?: boolean | null) => (
    <Badge variant={isVerified ? "secondary" : "destructive"}>
      {isVerified ? t("status.verified") : t("status.unverified")}
    </Badge>
  )

  const formatDate = (date?: string | null) => {
    if (!date) return t("common.unknown")
    try {
      return new Date(date).toLocaleDateString()
    } catch {
      return t("common.error")
    }
  }

  if (userLoading || !user) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("dialogs.details.title")}</DialogTitle>
            <DialogDescription>{t("dialogs.details.description")}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const userDisplayName =
    `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
    user.username ||
    user.email

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              {userDisplayName}
            </DialogTitle>
            <DialogDescription>
              {t("dialogs.details.description")}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">{t("tabs.details")}</TabsTrigger>
              <TabsTrigger value="roles">{t("tabs.roles")}</TabsTrigger>
              <TabsTrigger value="positions">{t("tabs.positions")}</TabsTrigger>
              <TabsTrigger value="projects">{t("tabs.projects")}</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4" />
                    {t("sections.personalInfo")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {t("form.firstName")}
                      </p>
                      <p className="text-base">{user.firstName || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {t("form.lastName")}
                      </p>
                      <p className="text-base">{user.lastName || "-"}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {t("form.username")}
                    </p>
                    <p className="text-base font-mono">{user.username || "-"}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {t("form.email")}
                      </p>
                      <p className="text-base">{user.email || "-"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {t("form.phone")}
                      </p>
                      <p className="text-base">{user.phone || "-"}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      {t("form.userType")}
                    </p>
                    {getUserTypeBadge(user.userType)}
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      {t("table.verification")}
                    </p>
                    {getVerificationBadge(user.isVerified)}
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {t("table.createdAt")}
                        </p>
                        <p className="text-base">{formatDate(user.createdAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {t("table.updatedAt")}
                        </p>
                        <p className="text-base">{formatDate(user.updatedAt)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="roles" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    {t("sections.roles")}
                  </CardTitle>
                  <CardDescription>
                    {t("sections.rolesDescription")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {rolesLoading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-8 w-full" />
                    </div>
                  ) : userRoles?.data && userRoles.data.length > 0 ? (
                    <div className="space-y-2">
                      {userRoles.data.map((role: unknown, index: number) => {
                        const roleData = role as {
                          role?: { name?: string; description?: string; level?: string }
                          name?: string
                          description?: string
                          level?: string
                        }
                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div>
                              <p className="font-medium">
                                {roleData.role?.name || roleData.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {roleData.role?.description || roleData.description}
                              </p>
                            </div>
                            <Badge variant="outline">
                              {roleData.role?.level || roleData.level || "Standard"}
                            </Badge>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>{t("empty.roles")}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="positions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    {t("sections.positions")}
                  </CardTitle>
                  <CardDescription>
                    {t("sections.positionsDescription")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {positionsLoading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                  ) : userPositions?.data && userPositions.data.length > 0 ? (
                    <div className="space-y-2">
                      {userPositions.data.map((position: unknown, index: number) => {
                        const positionData = position as {
                          position?: { title?: string; department?: string }
                          title?: string
                          department?: string
                          status?: string
                          startDate?: string
                        }
                        return (
                          <div key={index} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">
                                  {positionData.position?.title || positionData.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {positionData.position?.department || positionData.department}
                                </p>
                              </div>
                              <Badge variant="outline">
                                {positionData.status || "Active"}
                              </Badge>
                            </div>
                            {positionData.startDate && (
                              <p className="text-sm text-muted-foreground mt-2">
                                {t("labels.since")}: {formatDate(positionData.startDate)}
                              </p>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>{t("empty.positions")}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FolderOpen className="h-4 w-4" />
                    {t("sections.projects")}
                  </CardTitle>
                  <CardDescription>
                    {t("sections.projectsDescription")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {projectsLoading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                  ) : userProjects?.data && userProjects.data.length > 0 ? (
                    <div className="space-y-2">
                      {userProjects.data.map((project: unknown, index: number) => {
                        const projectData = project as {
                          project?: { title?: string; description?: string }
                          title?: string
                          description?: string
                          role?: string
                          joinedAt?: string
                        }
                        return (
                          <div key={index} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">
                                  {projectData.project?.title || projectData.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {projectData.project?.description || projectData.description}
                                </p>
                              </div>
                              <Badge variant="outline">
                                {projectData.role || "Member"}
                              </Badge>
                            </div>
                            {projectData.joinedAt && (
                              <p className="text-sm text-muted-foreground mt-2">
                                {t("labels.joined")}: {formatDate(projectData.joinedAt)}
                              </p>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>{t("empty.projects")}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <DialogFooter className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEditDialog(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                {t("actions.edit")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDeleteDialog(true)}
                className="text-destructive hover:text-destructive"
              >
                <Trash className="h-4 w-4 mr-2" />
                {t("actions.delete")}
              </Button>
            </div>
            <Button onClick={onClose}>{t("actions.close")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {showEditDialog && (
        <EditUserDialog
          userId={userId}
          isOpen={showEditDialog}
          onClose={() => setShowEditDialog(false)}
        />
      )}

      {showDeleteDialog && (
        <DeleteUserDialog
          userId={userId}
          isOpen={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
        />
      )}
    </>
  )
}
