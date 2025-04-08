// Background service worker
chrome.runtime.onInstalled.addListener(() => {
  // Initialize extension state
  chrome.storage.local.set({
    metrics: {
      lcp: null,
      fid: null,
      cls: null,
      inp: null,
    },
    accessibility: {
      violations: [],
      lastScan: null,
    },
    flags: {
      overrides: {},
    },
  });
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message) => {
  // Handle messages from content script
  if (message.type === 'UPDATE_METRICS') {
    chrome.storage.local.set({ metrics: message.payload });
  }
});
