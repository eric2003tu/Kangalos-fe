// components/ui/Documents.tsx
"use client";

import { useRef } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UploadCloud, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Documents({ form }: { form: any }) {
  const fileInputs = {
    boundarySummary: useRef<HTMLInputElement>(null),
    businessModel: useRef<HTMLInputElement>(null),
    implementationReadings: useRef<HTMLInputElement>(null),
    teamProfiles: useRef<HTMLInputElement>(null),
  };

  const handleFileChange = (name: string, files: FileList | null) => {
    if (files && files[0]) {
      form.setValue(name, files[0]);
    }
  };

  const removeFile = (name: string) => {
    form.setValue(name, undefined);
    if (fileInputs[name as keyof typeof fileInputs].current) {
      fileInputs[name as keyof typeof fileInputs].current!.value = "";
    }
  };

  const documentLabels = {
    boundarySummary: "Boundary Summary",
    businessModel: "Business Model Course",
    implementationReadings: "Implementation Readings / Get it Chat",
    teamProfiles: "Team Profiles / OK"
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Documents</h2>
      <p className="text-gray-600">Upload all required documents to continue</p>

      <div className="space-y-8">
        {Object.entries(fileInputs).map(([name, ref]) => (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{documentLabels[name as keyof typeof documentLabels]}</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <input
                      id={name}
                      type="file"
                      placeholder="Documents"
                      ref={ref}
                      onChange={(e) => handleFileChange(name, e.target.files)}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                    />
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => ref.current?.click()}
                      >
                        <UploadCloud className="h-4 w-4" />
                        {field.value?.name || "Choose File"}
                      </Button>
                      {field.value && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(name)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                    {field.value && (
                      <div className="text-sm text-gray-600">
                        Selected: {field.value.name} ({(field.value.size / 1024).toFixed(2)} KB)
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <div className="pt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Documents (Optional)</h3>
          <FormField
            control={form.control}
            name="additionalDocuments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add Custom Documents</FormLabel>
                <FormControl>
                  <Input
                    id="additionalDocuments"
                    type="file"
                    multiple
                    onChange={(e) => {
                      const files = e.target.files ? Array.from(e.target.files) : [];
                      field.onChange(files);
                    }}
                  />
                </FormControl>
                <div className="text-sm text-gray-500 mt-2">
                  {field.value?.length > 0
                    ? `${field.value.length} files selected`
                    : "No files selected"}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}