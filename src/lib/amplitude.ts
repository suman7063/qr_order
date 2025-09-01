import { init, track } from '@amplitude/analytics-browser';

// Initialize Amplitude
export const initAmplitude = () => {
  // Replace with your actual Amplitude API key
  const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || 'your-amplitude-api-key';
  
  // Validate API key format
  if (!API_KEY || API_KEY === 'your-amplitude-api-key') {
    console.warn('Amplitude API key not configured. Please add NEXT_PUBLIC_AMPLITUDE_API_KEY to your .env.local file');
    return;
  }
  
  if (API_KEY.length !== 32) {
    console.error('Invalid Amplitude API key format. Expected 32 characters, got:', API_KEY.length);
    return;
  }
  
  try {
    init(API_KEY, {
      serverZone: 'EU', // Use EU server zone
      defaultTracking: {
        sessions: true,
        pageViews: true,
        formInteractions: true,
        fileDownloads: true,
      },
    });
    console.log('Amplitude initialized successfully with EU server zone');
  } catch (error) {
    console.error('Failed to initialize Amplitude:', error);
  }
};

// Track click events
export const trackClick = (elementName: string, properties?: Record<string, any>) => {
  try {
    track('click', {
      element: elementName,
      timestamp: new Date().toISOString(),
      ...properties,
    });
  } catch (error) {
    console.error('Failed to track click event:', error);
  }
};

// Track page views
export const trackPageView = (pageName: string) => {
  try {
    track('page_view', {
      page: pageName,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : '',
      referrer: typeof window !== 'undefined' ? document.referrer : '',
    });
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
};

// Track session start
export const trackSessionStart = () => {
  try {
    track('session_start', {
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
      screenResolution: typeof window !== 'undefined' ? `${screen.width}x${screen.height}` : '',
    });
  } catch (error) {
    console.error('Failed to track session start:', error);
  }
};

// Track user engagement
export const trackEngagement = (action: string, duration?: number) => {
  try {
    track('user_engagement', {
      action,
      duration,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Failed to track engagement:', error);
  }
};
