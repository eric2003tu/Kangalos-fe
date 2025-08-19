"use client";

import type * as React from "react";
import { ChevronRight, Bell, X, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import UserProfile from "@/components/global/UserProfile"; // Import the UserProfile component
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Globe, Moon, Settings, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

import type { LucideIcon } from "lucide-react";

export interface SidebarSubItem {
  title: string;
  url: string;
  isActive?: boolean;
}

export interface SidebarItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  badge?: string;
  subItems?: SidebarSubItem[];
}

export interface SidebarGroup {
  label: string;
  items: SidebarItem[];
}

export interface SidebarUser {
  name: string;
  role: string;
  avatar: string;
  systemName: string;
}

export interface SidebarFooterAction {
  icon: LucideIcon;
  label: string;
  items: Array<{
    label: string;
    action: string;
  }>;
}

export interface SidebarNotification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface SidebarConfig {
  user: SidebarUser;
  navigationGroups: SidebarGroup[];
  footerActions: SidebarFooterAction[];
  notifications: SidebarNotification[];
}

interface ReusableSidebarProps {
  config: SidebarConfig;
  currentPath?: string;
  children: React.ReactNode;
}

export function ReusableSidebar({ config, currentPath = "/", children }: ReusableSidebarProps) {
  const t = useTranslations("sidebar");
  const tAuth = useTranslations("Auth");
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const currentLocale = useLocale();

  const languages = [
    { code: "en", label: "English" },
    { code: "fr", label: "French" },
    { code: "ko", label: "Korean" },
  ];

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleSettings = () => {
    // Placeholder for settings handler
  };

  
  return (
    <SidebarProvider>
      <Sidebar className="border-r">
        {/* Header */}
        <SidebarHeader className="p-4 pt-8 min-h-60">
          <div className="flex flex-col items-center gap-3 text-center">
            <Image
              src="/images/ur-logo.png"
              alt={"User Avatar"}
              width={240}
              height={240}
              className="rounded-full object-cover"
            />
            
          </div>
        </SidebarHeader>

        {/* Content */}
        <SidebarContent
          className="overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 dark:hover:scrollbar-thumb-gray-500"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgb(209 213 219) transparent'
          }}
        >
          {config.navigationGroups.map((group, groupIndex) => (
            <SidebarGroup key={groupIndex}>
              <SidebarGroupLabel>{t(group.label)}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item, itemIndex) => (
                    <SidebarMenuItem key={itemIndex}>
                      {item.subItems ? (
                        <Collapsible defaultOpen={item.isActive} className="group/collapsible">
                          <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                              <SidebarMenuButton className="w-full" isActive={item.isActive || false}>
                                <item.icon className="h-4 w-4" />
                                <span>{t(item.title)}</span>
                                <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                              </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="transition-all duration-200">
                              <SidebarMenuSub>
                                {item.subItems.map((subItem, subIndex) => (
                                  <SidebarMenuSubItem key={subIndex}>
                                    <SidebarMenuSubButton
                                      asChild
                                      isActive={subItem.isActive || currentPath === subItem.url}
                                    >
                                      <a href={subItem.url}>{t(subItem.title)}</a>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                ))}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </SidebarMenuItem>
                        </Collapsible>
                      ) : (
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={item.isActive || currentPath === item.url}>
                            <a href={item.url} className="flex items-center gap-2">
                              <item.icon className="h-4 w-4" />
                              <span>{t(item.title)}</span>
                              {item.badge && (
                                <Badge variant="secondary" className="ml-auto h-5 px-1.5 ">
                                  {t(item.badge)}
                                </Badge>
                              )}
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter className="p-4">
          <div className="flex items-center justify-between">
            {/* Theme Toggle - Direct toggle without dropdown */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:scale-110 transition-transform cursor-pointer"
              onClick={handleThemeToggle}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">{t("Theme")}</span>
            </Button>

            {/* Language Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:scale-110 transition-transform cursor-pointer"
                >
                  <Globe className="h-4 w-4" />
                  <span className="sr-only">{t("Language")}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" side="top">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => {
                      if (lang.code !== currentLocale) {
                        document.cookie = `locale=${lang.code}; path=/`;
                        router.refresh();
                      }
                    }}
                    className={
                      "cursor-pointer flex items-center gap-2 px-2 py-2" +
                      (lang.code === currentLocale ? " bg-primary text-white" : "")
                    }
                  >
                    <span>{t(lang.label)}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Settings Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:scale-110 transition-transform cursor-pointer">
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">{tAuth("settings")}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" side="top">
                <DropdownMenuItem className="cursor-pointer" onClick={handleSettings}>{t("Preferences")}</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">{tAuth("account")}</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">{t("notifications.title")}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            
          </div>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        {/* Top Bar with Trigger and Action Icons */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 top-0 w-full z-[1000] sticky bg-white ">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">{config.user.systemName}</h1>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* Notifications */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
                  <Bell className="h-4 w-4" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 ">
                    {config.notifications.filter((n) => !n.read).length}
                  </Badge>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-96" align="end">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium leading-none">{t("notifications.title")}</h4>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-6 ">
                        {t("notifications.markAllRead")}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 ">
                        {t("notifications.clearAll")}
                      </Button>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
                    {config.notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "p-3 rounded-lg border  group hover:bg-muted/50 transition-colors",
                          notification.read ? "bg-muted/30" : "bg-background border-blue-200",
                        )}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1 flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-medium truncate">{t(notification.title)}</p>
                              {!notification.read && <div className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />}
                            </div>
                            <p className="text-muted-foreground  leading-relaxed">{t(notification.message)}</p>
                            <p className=" text-muted-foreground">{t(notification.time)}</p>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 hover:bg-blue-100"
                              title={notification.read ? t("notifications.markAsUnread") : t("notifications.markAsRead")}
                            >
                              <div
                                className={cn(
                                  "h-2 w-2 rounded-full",
                                  notification.read ? "border-2 border-gray-400" : "bg-blue-500",
                                )}
                              />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 hover:bg-red-100"
                              title={t("notifications.deleteNotification")}
                            >
                              <X className="h-3 w-3 text-red-500" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-gray-100" title={t("notifications.ignore")}>
                              <EyeOff className="h-3 w-3 text-gray-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t">
                    <Button variant="ghost" className="w-full ">
                      {t("notifications.viewAll")}
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <UserProfile />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
