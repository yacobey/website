import { useBusinessConfig } from "@/hooks/use-business-config";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Upload, Bot } from "lucide-react";

export function BusinessLinks() {
  const { data: businessConfig, isLoading } = useBusinessConfig();

  if (isLoading || !businessConfig) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Button
        variant="outline"
        className="h-20 flex flex-col gap-2"
        onClick={() => window.open(businessConfig.links.calendly, '_blank')}
      >
        <Calendar className="h-5 w-5 text-purple-600" />
        <span className="text-xs">Book Consultation</span>
      </Button>
      
      <Button
        variant="outline"
        className="h-20 flex flex-col gap-2"
        onClick={() => window.open(businessConfig.links.intakeForm, '_blank')}
      >
        <FileText className="h-5 w-5 text-green-600" />
        <span className="text-xs">Client Intake</span>
      </Button>
      
      <Button
        variant="outline"
        className="h-20 flex flex-col gap-2"
        onClick={() => window.open(businessConfig.links.secureUpload, '_blank')}
      >
        <Upload className="h-5 w-5 text-blue-600" />
        <span className="text-xs">Upload Documents</span>
      </Button>
      
      <Button
        variant="outline"
        className="h-20 flex flex-col gap-2"
        onClick={() => window.open(businessConfig.links.agentPublic, '_blank')}
      >
        <Bot className="h-5 w-5 text-orange-600" />
        <span className="text-xs">AI Assistant</span>
      </Button>
    </div>
  );
}