// Analytics & Conversion Tracking Layer for SHAVI Medical Growth
// Supports Google Tag Manager (dataLayer), GA4 (gtag), Meta Pixel (fbq), and TikTok Pixel (ttq)

export type TrackingEventName =
  | 'page_view'
  | 'scroll_depth'
  | 'cta_click'
  | 'whatsapp_click'
  | 'form_start'
  | 'form_submit'
  | 'specialty_selection'
  | 'bottleneck_selection'
  | 'booking_click';

export interface TrackingPayload {
  event_category?: string;
  event_label?: string;
  specialty?: string;
  bottleneck?: string;
  cta_location?: string;
  scroll_percentage?: number;
  value?: string | number;
  [key: string]: unknown;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      track: (event: string, payload?: Record<string, unknown>) => void;
    };
  }
}

export function trackEvent(eventName: TrackingEventName, payload: TrackingPayload = {}): void {
  if (typeof window === 'undefined') return;

  const timestamp = new Date().toISOString();
  const eventData = {
    event: eventName,
    page_path: '/medical-growth',
    brand: 'Shavi Medical Growth',
    timestamp,
    ...payload,
  };

  // Push to GTM dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventData);

  // Dispatch to GA4 if present
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, payload);
  }

  // Dispatch to Meta Pixel if present
  if (typeof window.fbq === 'function') {
    if (eventName === 'form_submit') {
      window.fbq('track', 'Lead', payload);
    } else if (eventName === 'whatsapp_click' || eventName === 'booking_click') {
      window.fbq('track', 'Contact', payload);
    } else {
      window.fbq('trackCustom', eventName, payload);
    }
  }

  // Dispatch to TikTok Pixel if present
  if (window.ttq && typeof window.ttq.track === 'function') {
    window.ttq.track(eventName, payload);
  }
}

export function buildWhatsAppUrl(customMessage?: string): string {
  const phone = '201115042478';
  const defaultMsg =
    'مرحباً فريق Shavi، أرغب في حجز جلسة تشخيص منظومة النمو (Medical Growth Audit) لعيادتي/مركزي الطبي.';
  const text = encodeURIComponent(customMessage || defaultMsg);
  return `https://wa.me/${phone}?text=${text}`;
}
