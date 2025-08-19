// app/innovation-form/steps/classification.tsx
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface ClassificationProps {
  form: any;
}

export default function Classification({ form }: ClassificationProps) {
  const fieldsOfInnovation = [
    "Agriculture",
    "Biotechnology",
    "Clean Technology",
    "Construction",
    "Education",
    "Energy",
    "Engineering",
    "Environment",
    "Finance",
    "Healthcare",
    "ICT",
    "Manufacturing",
    "Transportation",
    "Other"
  ];

  const ipTypes = [
    "Patent",
    "Trade Secret",
    "Utility Model",
    "Copyright",
    "None Expected",
    "Other"
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Innovation Classification</h2>
      <p className="text-gray-600">Technical details and intellectual property aspects</p>
      
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="fieldOfInnovation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Field of Innovation *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the primary field of your innovation" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {fieldsOfInnovation.map((field) => (
                    <SelectItem key={field} value={field}>{field}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="expectedIP"
          render={() => (
            <FormItem>
              <FormLabel>Expected Intellectual Property *</FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ipTypes.map((ip) => (
                  <FormField
                    key={ip}
                    control={form.control}
                    name="expectedIP"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={ip}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(ip)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, ip])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) => value !== ip
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {ip}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}