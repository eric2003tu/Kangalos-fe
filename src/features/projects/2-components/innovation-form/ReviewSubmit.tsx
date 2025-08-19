import { FormData } from "./types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface ReviewSubmitProps {
  formData: FormData;
  onSubmit: () => void;
  onPrev: () => void;
}

export const ReviewSubmit = ({ formData, onSubmit, onPrev }: ReviewSubmitProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Review & Submit</h2>
        <p className="text-muted-foreground">Please review your information before submitting</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Project Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="font-medium">Project Name:</span>
              <p className="text-muted-foreground">{formData.projectName || "Not specified"}</p>
            </div>
            <div>
              <span className="font-medium">Project Title:</span>
              <p className="text-muted-foreground">{formData.projectTitle || "Not specified"}</p>
            </div>
            <div>
              <span className="font-medium">Year:</span>
              <p className="text-muted-foreground">{formData.year || "Not specified"}</p>
            </div>
            <div>
              <span className="font-medium">Primary SDG:</span>
              <p className="text-muted-foreground">{formData.primarySDG || "Not specified"}</p>
            </div>
            {formData.additionalSDGs.length > 0 && (
              <div>
                <span className="font-medium">Additional SDGs:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.additionalSDGs.map((sdg) => (
                    <Badge key={sdg} variant="secondary" className="text-xs">
                      {sdg}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Team & Contacts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="font-medium">Team Members:</span>
              <div className="space-y-2 mt-2">
                {(formData.teamMembers || []).map((member, index) => (
                  <div key={index} className="text-sm">
                    <p className="font-medium">{member.name} ({member.role})</p>
                    <p className="text-muted-foreground">{member.email}</p>
                  </div>
                ))}
                {!formData.teamMembers?.length && (
                  <p className="text-muted-foreground">No team members added</p>
                )}
              </div>
            </div>
            <Separator />
            <div>
              <span className="font-medium">Primary Contact:</span>
              <p className="text-muted-foreground">{formData.generalContact?.primaryEmail || "Not specified"}</p>
              <p className="text-muted-foreground">{formData.generalContact?.primaryPhone || "Not specified"}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Innovation Classification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="font-medium">Field:</span>
              <p className="text-muted-foreground">{formData.fieldOfInnovation || "Not specified"}</p>
            </div>
            {formData.innovationSubfield && (
              <div>
                <span className="font-medium">Sub-field:</span>
                <p className="text-muted-foreground">{formData.innovationSubfield}</p>
              </div>
            )}
            <div>
              <span className="font-medium">Expected IP:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {formData.expectedIP.length > 0 ? (
                  formData.expectedIP.map((ip) => (
                    <Badge key={ip} variant="outline" className="text-xs">
                      {ip}
                    </Badge>
                  ))
                ) : (
                  <p className="text-muted-foreground">None specified</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Support & Funding</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="font-medium">Past Funding:</span>
              <p className="text-muted-foreground">{formData.pastFunding?.hasPastFunding ? "Yes" : "No"}</p>
            </div>
            {formData.pastFunding?.hasPastFunding && formData.pastFunding.funders?.length > 0 && (
              <div>
                <span className="font-medium">Previous Funders:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.pastFunding.funders.map((funder) => (
                    <Badge key={funder} variant="secondary" className="text-xs">
                      {funder}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            <div>
              <span className="font-medium">Future Funding Needed:</span>
              <p className="text-muted-foreground">{formData.futureFunding?.needsFunding ? "Yes" : "No"}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrev}>
          Previous
        </Button>
        <Link href="/dashboard/projectPage">
        <Button className="bg-primary hover:bg-primary/90">
          Submit Form
        </Button>
        </Link>
      </div>
    </div>
  );
};