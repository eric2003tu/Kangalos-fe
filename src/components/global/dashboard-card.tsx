"use client";

import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface DashboardCardProps {
  title: string;
  description: string;
  tooltipContent: string;
  icon: LucideIcon;
  iconColor: string;
  url: string;
  count: number;
  className?: string;
}

export function DashboardCard({
  title,
  description,
  tooltipContent,
  icon: Icon,
  iconColor,
  url,
  count,
  className,
}: DashboardCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(url);
  };

  // Extract the color value for hover effects
  const getHoverColorClass = (iconColor: string) => {
    const colorMap: { [key: string]: string; } = {
      "text-blue-600": "hover:bg-blue-50 hover:border-blue-200",
      "text-green-600": "hover:bg-green-50 hover:border-green-200",
      "text-orange-600": "hover:bg-orange-50 hover:border-orange-200",
      "text-purple-600": "hover:bg-purple-50 hover:border-purple-200",
      "text-indigo-600": "hover:bg-indigo-50 hover:border-indigo-200",
      "text-teal-600": "hover:bg-teal-50 hover:border-teal-200",
      "text-slate-600": "hover:bg-slate-50 hover:border-slate-200",
      "text-red-600": "hover:bg-red-50 hover:border-red-200",
      "text-yellow-600": "hover:bg-yellow-50 hover:border-yellow-200",
      "text-emerald-600": "hover:bg-emerald-50 hover:border-emerald-200",
      "text-pink-600": "hover:bg-pink-50 hover:border-pink-200",
      "text-cyan-600": "hover:bg-cyan-50 hover:border-cyan-200",
      "text-lime-600": "hover:bg-lime-50 hover:border-lime-200",
      "text-violet-600": "hover:bg-violet-50 hover:border-violet-200",
      "text-rose-600": "hover:bg-rose-50 hover:border-rose-200",
      "text-blue-500": "hover:bg-blue-50 hover:border-blue-200",
      "text-blue-700": "hover:bg-blue-50 hover:border-blue-200",
      "text-green-700": "hover:bg-green-50 hover:border-green-200",
      "text-orange-700": "hover:bg-orange-50 hover:border-orange-200",
      "text-purple-700": "hover:bg-purple-50 hover:border-purple-200",
      "text-indigo-700": "hover:bg-indigo-50 hover:border-indigo-200",
      "text-teal-700": "hover:bg-teal-50 hover:border-teal-200",
      "text-red-700": "hover:bg-red-50 hover:border-red-200",
      "text-yellow-700": "hover:bg-yellow-50 hover:border-yellow-200",
    };
    return colorMap[iconColor] || "hover:bg-gray-50 hover:border-gray-200";
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card
            className={cn(
              "cursor-pointer transition-all duration-200 hover:shadow-md border",
              getHoverColorClass(iconColor),
              className,
            )}
            onClick={handleClick}
          >
            <CardContent className="p-4 sm:p-5">
              <div className="space-y-3 sm:space-y-4">
                {/* Top row with icon and number */}
                <div className="flex justify-between items-start">
                  <div className="p-2 rounded-lg bg-gray-50">
                    <Icon className={cn("h-5 w-5 sm:h-6 sm:w-6", iconColor)} />
                  </div>
                  <div className={cn("text-2xl sm:text-3xl font-bold", iconColor)}>{count.toLocaleString()}</div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm sm:text-base leading-tight">{title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">{description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-md w-80 p-4 text-sm leading-relaxed" sideOffset={8}>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Icon className={cn("h-5 w-5", iconColor)} />
              <p className="font-semibold">{title}</p>
            </div>
            <p className="text-foreground">{tooltipContent}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
