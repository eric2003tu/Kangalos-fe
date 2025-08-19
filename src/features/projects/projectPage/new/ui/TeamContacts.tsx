// components/ui/TeamContacts.tsx
"use client";

import { useFieldArray } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface TeamContactsProps {
  form: any;
}

export default function TeamContacts({ form }: TeamContactsProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "teamMembers"
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Team Members & Contacts</h2>
      <p className="text-gray-600">Information about your team and contact details</p>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Team Members</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-4">
              <FormField
                control={form.control}
                name={`teamMembers.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input 
                        id={`teamMembers.${index}.name`}
                        placeholder="Member name" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`teamMembers.${index}.email`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input
                        id={`teamMembers.${index}.email`}
                        placeholder="Email address" 
                        type="email" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`teamMembers.${index}.role`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role *</FormLabel>
                    <FormControl>
                      <Input
                        id={`teamMembers.${index}.role`}
                        placeholder="Role" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mb-[0.35rem]"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ name: "", email: "", role: "" })}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Team Member
          </Button>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">General Project Contact</h3>
          
          <FormField
            control={form.control}
            name="primaryPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Phone *</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <span className="mr-2 text-gray-500">+250</span>
                    <Input
                      id="primaryPhone"
                      placeholder="xxx xxx xxx" 
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="primaryEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Email *</FormLabel>
                <FormControl>
                  <Input
                    id="primaryEmail"
                    placeholder="project@example.com" 
                    type="email" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="secondaryPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Secondary Phone (Optional)</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <span className="mr-2 text-gray-500">+250</span>
                    <Input
                      id="secondaryPhone"
                      placeholder="xxx xxx xxx" 
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="secondaryEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Secondary Email (Optional)</FormLabel>
                <FormControl>
                  <Input
                    id="secondaryEmail"
                    placeholder="backup@example.com" 
                    type="email" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}