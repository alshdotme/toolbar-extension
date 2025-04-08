// Types for web vitals - using type assertions instead of interfaces to avoid conflicts
type WebVitalEntry = PerformanceEntry & {
  // Common fields potentially needed for calculations
  startTime: number;
  duration: number;
  // LCP specific fields
  renderTime?: number;
  loadTime?: number;
  size?: number;
  element?: Element;
  // FID specific fields
  processingStart?: number;
  processingEnd?: number;
  target?: Node | null;
  // CLS specific fields
  value?: number;
  hadRecentInput?: boolean;
  sources?: Array<{
    node?: Node;
    previousRect: DOMRectReadOnly;
    currentRect: DOMRectReadOnly;
  }>;
};

// Helper to check if a performance entry type is supported
const isSupported = (type: string): boolean => {
  if (!PerformanceObserver.supportedEntryTypes?.includes(type)) {
    console.log(`Performance entry type '${type}' is not supported`); 
    return false;
  }
  return true;
};

// Initialize performance monitoring
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const metrics: Record<string, number> = {};

  for (const entry of entries) {
    if (entry.entryType === 'largest-contentful-paint') {
      // LCP: Time when largest content element was rendered
      metrics.lcp = entry.startTime;
    } else if (entry.entryType === 'first-input') {
      // FID: Delay between first user interaction and processing start
      const fidEntry = entry as WebVitalEntry;
      if (fidEntry.processingStart) {
        metrics.fid = fidEntry.processingStart - fidEntry.startTime;
      }
    } else if (entry.entryType === 'layout-shift') {
      // CLS: Cumulative layout shift score
      const clsEntry = entry as WebVitalEntry;
      if (typeof clsEntry.value === 'number') {
        metrics.cls = (metrics.cls || 0) + clsEntry.value;
      }
    } else if (entry.entryType === 'event') {
      // INP: Event duration for slow interactions
      // This is a simplified approach - actual INP calculation is more complex
      if (entry.duration > 200) { // Consider only slow interactions
        metrics.inp = entry.duration;
      }
    }
  }

  // Send metrics to background script
  chrome.runtime.sendMessage({
    type: 'UPDATE_METRICS',
    payload: metrics,
  });
});

// Build a list of supported entry types
const supportedEntryTypes = [];
if (isSupported('largest-contentful-paint')) supportedEntryTypes.push('largest-contentful-paint');
if (isSupported('first-input')) supportedEntryTypes.push('first-input');
if (isSupported('layout-shift')) supportedEntryTypes.push('layout-shift');
if (isSupported('event')) supportedEntryTypes.push('event');

// Only observe if we have supported entry types
if (supportedEntryTypes.length > 0) {
  observer.observe({
    entryTypes: supportedEntryTypes,
  });
}
