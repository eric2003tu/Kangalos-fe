"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedField: string;
  setSelectedField: (field: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
}

export function FilterSection({
  searchTerm,
  setSearchTerm,
  selectedField,
  setSelectedField,
  selectedStatus,
  setSelectedStatus,
}: FilterSectionProps) {
  const fields = ["All Fields", "Agriculture", "Health", "ICT", "Energy"];
  const statuses = ["All Projects", "Previously funded", "New"];

  return (
    <div className="bg-white p-4 border border-gray-200 rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <p className="text-xs font-medium text-gray-500 mb-1">search projects...</p>
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="lg:w-1/2 border-gray-300 focus-visible:ring-1"
            placeholder="Type to search..."
          />
        </div>

        {/* Field Select */}
        <div className="flex items-center gap-2">
          <Select
            value={selectedField}
            onValueChange={setSelectedField}
          >
            <SelectTrigger className="w-[180px] text-xs h-8 border-gray-300">
              <SelectValue placeholder="All Fields" />
            </SelectTrigger>
            <SelectContent>
              {fields.map((field) => (
                <SelectItem key={field} value={field} className="text-xs">
                  {field}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status Select */}
        <div className="flex items-center gap-2">
          <Select
            value={selectedStatus}
            onValueChange={setSelectedStatus}
          >
            <SelectTrigger className="w-[180px] text-xs h-8 border-gray-300">
              <SelectValue placeholder="All Projects" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status} className="text-xs">
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}