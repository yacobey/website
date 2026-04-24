// Google Analytics initialization and tracking functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export type AnalyticsEventMap = {
  click: {
    action:
      | 'try_ai_builder'
      | 'generate_calculator'
      | 'use_tax_calculator'
      | 'use_roi_calculator'
      | 'use_cash_flow_calculator'
      | 'view_all_posts'
      | 'read_article';
    section: 'ai_tools' | 'blog_preview' | 'calculator_builder';
    article?: string;
  };
  action: {
    action: 'cash_flow_add_item' | 'cash_flow_remove_item';
    type?: 'income' | 'expense';
  };
  calculator_use: {
    action: 'custom_calculator' | 'roi_calculator' | 'tax_calculator';
    name?: string;
    investment?: string;
    income?: string;
  };
  form_submit: {
    section: 'contact_form' | 'contact_page';
  };
  form_error: {
    section: 'contact_form' | 'contact_page';
  };
  schedule_consultation_click: {
    section: 'hero' | 'contact_page';
  };
  get_in_touch_click: {
    section: 'hero';
  };
  book_call_click: {
    section: 'services';
    service: string;
  };
  acca_service_click: {
    service_name: string;
    section: 'acca_services';
  };
  acca_consultation_click: {
    section: 'acca_services';
  };
};

export function initGA() {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  
  if (!measurementId) {
    console.warn('Google Analytics measurement ID not found');
    return;
  }

  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_title: document.title,
    page_location: window.location.href,
  });
}

export function trackEvent<K extends keyof AnalyticsEventMap>(
  eventName: K,
  parameters: AnalyticsEventMap[K]
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
}

export function trackPageView(path: string, title?: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title || document.title,
    });
  }
}
