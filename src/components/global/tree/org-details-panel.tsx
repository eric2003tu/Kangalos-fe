'use client';

import { OrgNode } from "./types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Calendar, Building, Hash } from "lucide-react";

interface OrgDetailsPanelProps {
  orgData: OrgNode | null;
}

export function OrgDetailsPanel({ orgData }: OrgDetailsPanelProps) {
  if (!orgData) {
    return (
      <Card className="w-96 h-fit">
        <CardHeader>
          <CardTitle>Organization Details</CardTitle>
          <CardDescription>
            Click on an organization unit to view its details
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getLevelBadgeColor = (level: number) => {
    switch (level) {
      case 1: return "bg-blue-500 hover:bg-blue-600";
      case 2: return "bg-green-500 hover:bg-green-600";
      case 3: return "bg-purple-500 hover:bg-purple-600";
      default: return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const getLevelName = (level: number) => {
    switch (level) {
      case 1: return "University";
      case 2: return "College";
      case 3: return "School";
      default: return `Level ${level}`;
    }
  };

  return (
    <Card className="w-96 h-fit">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold leading-tight">
              {orgData.name}
            </CardTitle>
            <CardDescription className="mt-1">
              {orgData.shortName}
            </CardDescription>
          </div>
          <Badge
            className={`${getLevelBadgeColor(orgData.level)} text-white`}
          >
            {getLevelName(orgData.level)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Basic Information */}
        <div className="space-y-3">
          {orgData.code && (
            <div className="flex items-center gap-2 text-sm">
              <Hash className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Code:</span>
              <span className="text-muted-foreground">{orgData.code}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm">
            <Building className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">Level:</span>
            <span className="text-muted-foreground">{orgData.level}</span>
          </div>
        </div>

        <Separator />

        {/* Contact Information */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Contact Information</h4>

          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <a
              href={`mailto:${orgData.contactEmail}`}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              {orgData.contactEmail}
            </a>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <a
              href={`tel:${orgData.contactPhone}`}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              {orgData.contactPhone}
            </a>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {orgData.latitude.toFixed(4)}, {orgData.longitude.toFixed(4)}
            </span>
          </div>
        </div>

        <Separator />

        {/* Timestamps */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Timestamps</h4>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">Created:</span>
            <span className="text-muted-foreground text-xs">
              {formatDate(orgData.createdAt)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">Updated:</span>
            <span className="text-muted-foreground text-xs">
              {formatDate(orgData.updatedAt)}
            </span>
          </div>
        </div>

        {/* Children count */}
        {orgData.children.length > 0 && (
          <>
            <Separator />
            <div className="flex items-center gap-2 text-sm">
              <Building className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Sub-units:</span>
              <Badge variant="secondary">{orgData.children.length}</Badge>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
