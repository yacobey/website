import { useQuery } from "@tanstack/react-query";

export interface BusinessConfig {
  phone: {
    e164: string;
    display: string;
  };
  links: {
    calendly: string;
    intakeForm: string;
    secureUpload: string;
    agentPublic: string;
  };
  business: {
    name: string;
    email: string;
    address: string;
    hours: string;
  };
  seo: {
    socialImage: string;
    socialImageAlt: string;
    domain: string;
  };
  api: {
    baseUrl: string;
  };
}

export function useBusinessConfig() {
  return useQuery<BusinessConfig>({
    queryKey: ["/api/business-config"],
    staleTime: 1000 * 60 * 60, // 1 hour - business config doesn't change often
  });
}