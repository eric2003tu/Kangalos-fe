'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { useState } from "react"
import { ArrowLeft, Loader2 } from "lucide-react"

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DatePicker } from "@mantine/dates"
import { FileUpload } from "../../Startup/FileUpload"
import SelectFunder from "./SelectFunder"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { Project } from "@/lib/projects";
import { useParams } from "next/navigation";


const formSchema = z.object({
  projectTitle: z.string().min(2, {
    message: "Project title must be at least 2 characters.",
  }),
  funderName: z.string().optional(),
  reportingDate: z.date({
    required_error: "Reporting date is required.",
  }),
  projectStatus: z.string({
    required_error: "Please select a project status.",
  }),
  fundsUsage: z.string().min(10, {
    message: "Funds usage summary must be at least 10 characters.",
  }),
  challenges: z.string().min(10, {
    message: "Challenges & risks must be at least 10 characters.",
  }),
  nextSteps: z.string().min(10, {
    message: "Next steps must be at least 10 characters.",
  }),
  additionalComments: z.string().optional(),
  document: z.any().optional(),
})

export function ProjectReportForm() {
    const params = useParams();
    const router = useRouter();
    const projectId = params?.id ? parseInt(params.id as string) : null;
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [otherFunder, setOtherFunder] = useState("")
  const [isOtherChecked, setIsOtherChecked] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectTitle: "",
      funderName: "",
      fundsUsage: "",
      challenges: "",
      nextSteps: "",
      additionalComments: "",
    },
  })

  const handleOtherFunderChange = (value: string) => {
    setOtherFunder(value)
    form.setValue('funderName', value)
  }

  const handleOtherCheckChange = (checked: boolean) => {
    setIsOtherChecked(checked)
    if (!checked) {
      setOtherFunder("")
      form.setValue('funderName', "")
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      toast.success("Report submitted successfully!", {
        description: "The funder has been notified of your project update.",
      })
    }, 2000)
  }

  return (
    <Card className="w-full mx-auto shadow-lg mt-4">
      <CardHeader>
              <div className="flex items-center self-center gap-4 w-full">
                <Link href={`/dashboard/projectPage/${projectId}`}>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
                <div>
        <CardTitle className="text-xl md:text-2xl font-semibold text-gray-800">
          Report to Funder
        </CardTitle>
                </div>
              </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectFunder 
                  onOtherFunderChange={handleOtherFunderChange}
                  onOtherCheckChange={handleOtherCheckChange}
                />
            </div>

<div className="grid grid-cols-2 gap-6">
  {/* Project Status on the left */}
  <FormField
    control={form.control}
    name="projectStatus"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Project Status</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select project status" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="On Track">On Track</SelectItem>
            <SelectItem value="Delayed">Delayed</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="At Risk">At Risk</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />

  {/* Other Funder input on the right - shows when Other checkbox is checked */}
  {isOtherChecked && (
    <FormField
      control={form.control}
      name="funderName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Other Funder Name</FormLabel>
          <FormControl>
            <Input
              placeholder="Enter funder name"
              value={otherFunder}
              onChange={(e) => {
                const value = e.target.value
                setOtherFunder(value)
                field.onChange(value)
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )}
</div>
            <div className="grid lg:grid-cols-2 w-full gap-5">
            <FormField
              control={form.control}
              name="fundsUsage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Funds Usage Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Explain how funds were used..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="challenges"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Challenges & Risks</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe any challenges or risks encountered..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <div className="w-full grid lg:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="nextSteps"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Next Steps / Action Plan</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Outline the next steps for the project..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="additionalComments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Comments</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="If you have anything else to say, type it here..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <div className="space-y-6 md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900">Supporting Documents</h3>
              
              <FormField
                control={form.control}
                name="document"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Documents (PDF, DOC, PPT, XLS)</FormLabel>
                    <FormControl>
                      <FileUpload
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Report"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}