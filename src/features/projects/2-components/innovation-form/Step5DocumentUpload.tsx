import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Trash2, Plus } from "lucide-react";
import { TooltipField } from "./TooltipField";
import { StepProps, REQUIRED_DOCUMENTS, OPTIONAL_DOCUMENTS } from "./types";

export const Step5DocumentUpload = ({ formData, updateFormData, onNext, onPrev, isFirstStep }: StepProps) => {
  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());
  const [customDocName, setCustomDocName] = useState("");

  const handleFileUpload = async (docType: string, file: File) => {
    setUploadingFiles(prev => new Set([...prev, docType]));
    
    // Simulate file upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    updateFormData({
      documents: {
        ...formData.documents,
        required: {
          ...formData.documents.required,
          [docType]: file.name
        }
      }
    });
    
    setUploadingFiles(prev => {
      const next = new Set(prev);
      next.delete(docType);
      return next;
    });
  };

  const handleOptionalFileUpload = async (docName: string, file: File) => {
    setUploadingFiles(prev => new Set([...prev, docName]));
    
    // Simulate file upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const existingIndex = formData.documents.optional.findIndex(doc => doc.name === docName);
    let newOptional;
    
    if (existingIndex >= 0) {
      newOptional = [...formData.documents.optional];
      newOptional[existingIndex] = { name: docName, fileName: file.name };
    } else {
      newOptional = [...formData.documents.optional, { name: docName, fileName: file.name }];
    }
    
    updateFormData({
      documents: {
        ...formData.documents,
        optional: newOptional
      }
    });
    
    setUploadingFiles(prev => {
      const next = new Set(prev);
      next.delete(docName);
      return next;
    });
  };

  const removeRequiredFile = (docType: string) => {
    const { [docType]: _removed, ...rest } = formData.documents.required;
    void _removed;
    updateFormData({
      documents: {
        ...formData.documents,
        required: rest,
      },
    });
  };

  const removeOptionalFile = (docName: string) => {
    updateFormData({
      documents: {
        ...formData.documents,
        optional: formData.documents.optional.filter(doc => doc.name !== docName)
      }
    });
  };

  const addCustomDocument = () => {
    if (customDocName.trim()) {
      // Check if this custom document already exists
      const exists = formData.documents.optional.some(doc => doc.name === customDocName.trim());
      if (!exists) {
        updateFormData({
          documents: {
            ...formData.documents,
            optional: [...formData.documents.optional, { name: customDocName.trim(), fileName: "" }]
          }
        });
      }
      setCustomDocName("");
    }
  };

  const isValidFile = (file: File) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.ms-powerpoint'
    ];
    return allowedTypes.includes(file.type);
  };

  const allRequiredUploaded = REQUIRED_DOCUMENTS.every(doc => formData.documents.required[doc]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Document Upload</h2>
        <p className="text-muted-foreground">Upload required documents and any additional supporting materials</p>
      </div>

      {/* Required Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-foreground flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Required Documents (5/5)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {REQUIRED_DOCUMENTS.map((docType) => (
            <div key={docType} className="border border-border rounded-lg p-4">
              <TooltipField
                label={docType}
                tooltip={`Upload your ${docType.toLowerCase()} document. Accepted formats: PDF, DOCX, PPT`}
                id={`required-${docType}`}
              />
              
              {formData.documents.required[docType] ? (
                <div className="mt-2 flex items-center justify-between bg-muted/50 p-3 rounded">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{formData.documents.required[docType]}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRequiredFile(docType)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="mt-2">
                  <Input
                    type="file"
                    accept=".pdf,.docx,.doc,.pptx,.ppt"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (isValidFile(file)) {
                          handleFileUpload(docType, file);
                        } else {
                          alert("Please upload a PDF, DOCX, or PPT file");
                        }
                      }
                    }}
                    disabled={uploadingFiles.has(docType)}
                    className="cursor-pointer"
                  />
                  {uploadingFiles.has(docType) && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      Uploading...
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Optional Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-foreground flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Additional Documents (Optional)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Pre-defined optional documents */}
          {OPTIONAL_DOCUMENTS.map((docType) => {
            const isSelected = formData.documents.optional.some(doc => doc.name === docType);
            const uploadedDoc = formData.documents.optional.find(doc => doc.name === docType);
            
            return (
              <div key={docType} className="flex items-start space-x-3 border border-border rounded-lg p-4">
                <Checkbox
                  id={`optional-${docType}`}
                  checked={isSelected}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateFormData({
                        documents: {
                          ...formData.documents,
                          optional: [...formData.documents.optional, { name: docType, fileName: "" }]
                        }
                      });
                    } else {
                      removeOptionalFile(docType);
                    }
                  }}
                />
                <div className="flex-1">
                  <Label htmlFor={`optional-${docType}`} className="text-sm font-medium cursor-pointer">
                    {docType}
                  </Label>
                  
                  {isSelected && !uploadedDoc?.fileName && (
                    <div className="mt-2">
                      <Input
                        type="file"
                        accept=".pdf,.docx,.doc,.pptx,.ppt"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            if (isValidFile(file)) {
                              handleOptionalFileUpload(docType, file);
                            } else {
                              alert("Please upload a PDF, DOCX, or PPT file");
                            }
                          }
                        }}
                        disabled={uploadingFiles.has(docType)}
                        className="cursor-pointer"
                      />
                      {uploadingFiles.has(docType) && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                          Uploading...
                        </div>
                      )}
                    </div>
                  )}
                  
                  {uploadedDoc?.fileName && (
                    <div className="mt-2 flex items-center justify-between bg-muted/50 p-3 rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{uploadedDoc.fileName}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeOptionalFile(docType)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Custom document input */}
          <div className="border border-dashed border-border rounded-lg p-4">
            <Label className="text-sm font-medium text-foreground mb-2 block">Add Custom Document</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter document name..."
                value={customDocName}
                onChange={(e) => setCustomDocName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addCustomDocument();
                  }
                }}
              />
              <Button onClick={addCustomDocument} variant="outline" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Custom documents list */}
          {formData.documents.optional.filter(doc => !OPTIONAL_DOCUMENTS.includes(doc.name)).map((doc) => (
            <div key={doc.name} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">{doc.name}</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeOptionalFile(doc.name)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              {!doc.fileName ? (
                <div>
                  <Input
                    type="file"
                    accept=".pdf,.docx,.doc,.pptx,.ppt"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (isValidFile(file)) {
                          handleOptionalFileUpload(doc.name, file);
                        } else {
                          alert("Please upload a PDF, DOCX, or PPT file");
                        }
                      }
                    }}
                    disabled={uploadingFiles.has(doc.name)}
                    className="cursor-pointer"
                  />
                  {uploadingFiles.has(doc.name) && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      Uploading...
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-muted/50 p-3 rounded">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{doc.fileName}</span>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrev} disabled={isFirstStep}>
          Previous
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!allRequiredUploaded}
          className="bg-primary hover:bg-primary/90"
        >
          Continue to Review
        </Button>
      </div>
      
      {!allRequiredUploaded && (
        <p className="text-sm text-muted-foreground text-center">
          Please upload all required documents to continue
        </p>
      )}
    </div>
  );
};