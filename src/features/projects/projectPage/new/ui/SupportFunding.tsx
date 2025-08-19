// app/innovation-form/steps/support-funding.tsx
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

interface SupportFundingProps {
  form: any;
}

export default function SupportFunding({ form }: SupportFundingProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Support & Funding History</h2>
      <p className="text-gray-600">Past funding received and future funding needs</p>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Past Funding</h3>
          <FormField
            control={form.control}
            name="pastFunding"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Yes, we have received past funding or support
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Future Funding Needs</h3>
          <FormField
            control={form.control}
            name="futureFundingNeeds"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Yes, we need future funding or support
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}