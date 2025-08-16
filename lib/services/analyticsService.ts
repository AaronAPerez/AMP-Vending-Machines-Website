// lib/services/analyticsService.ts - Fixed TypeScript errors

interface AnalyticsGlobals {
  gtag?: (command: string, targetId: string, config?: Record<string, unknown>) => void;
}

export class AnalyticsService {
  private getAnalyticsWindow(): Window & AnalyticsGlobals {
    return window as Window & AnalyticsGlobals;
  }

  trackEvent(eventName: string, parameters?: Record<string, any>) {
    try {
      const analyticsWindow = this.getAnalyticsWindow();
      if (analyticsWindow.gtag) {
        analyticsWindow.gtag('event', eventName, parameters);
      }
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
    }
  }

  trackPageView(path: string) {
    try {
      const analyticsWindow = this.getAnalyticsWindow();
      if (analyticsWindow.gtag) {
        analyticsWindow.gtag('config', 'GA_MEASUREMENT_ID', {
          page_path: path,
        });
      }
    } catch (error) {
      console.warn('Page view tracking failed:', error);
    }
  }
}

export const analyticsService = new AnalyticsService();
