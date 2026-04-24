// Google Analytics initialization and tracking functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// All valid section identifiers used across analytics events.
// Add new section values here when introducing events that carry a `section` field.
export type AnalyticsSection =
  | 'ai_tools'
  | 'blog_preview'
  | 'calculator_builder'
  | 'contact_form'
  | 'contact_page'
  | 'hero'
  | 'services'
  | 'acca_services';

// Shared parameter shapes reused by multiple related events.
// Section fields derive from AnalyticsSection so literals stay centralized.
type ContactFormParams = { section: Extract<AnalyticsSection, 'contact_form' | 'contact_page'> };
type AccaParams = { section: Extract<AnalyticsSection, 'acca_services'> };

/**
 * AnalyticsEventMap — central registry of all trackable GA4 events.
 *
 * HOW TO ADD A NEW EVENT:
 *  1. Add a new key whose name matches the GA4 event name you want to fire.
 *  2. Define its parameter shape as the value type.
 *  3. If the event uses a `section` field, add the new value to `AnalyticsSection`
 *     above and reference it via Extract<AnalyticsSection, 'your-value'>.
 *  4. If two or more events share an identical parameter shape, extract a shared
 *     type (like `ContactFormParams`) and reuse it across those entries.
 *  5. Call `trackEvent('<your-event-name>', { ... })` at the call-site — TypeScript
 *     will enforce the correct parameter shape automatically.
 */
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
    section: Extract<AnalyticsSection, 'ai_tools' | 'blog_preview' | 'calculator_builder'>;
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
  // ContactFormParams is reused here because form_submit and form_error share the same shape
  form_submit: ContactFormParams;
  form_error: ContactFormParams;
  schedule_consultation_click: {
    section: Extract<AnalyticsSection, 'hero' | 'contact_page'>;
  };
  get_in_touch_click: {
    section: Extract<AnalyticsSection, 'hero'>;
  };
  book_call_click: {
    section: Extract<AnalyticsSection, 'services'>;
    service: string;
  };
  // AccaParams is reused here because acca_service_click and acca_consultation_click share the section
  acca_service_click: AccaParams & { service_name: string };
  acca_consultation_click: AccaParams;
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
