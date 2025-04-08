import React from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/tailwind.css';

const Popup = () => {
  return (
    <div className="max-w-[400px] max-h-[600px] overflow-hidden rounded-[var(--spacing-sm)] p-[var(--spacing-md)] bg-white text-zinc-900">
      <h1 className="text-[1.5rem] font-bold mb-[var(--spacing-md)] text-[var(--color-primary-700)]">
        Web Performance & Accessibility
      </h1>
      <div className="flex flex-col gap-[var(--spacing-md)]">
        {/* Placeholder for performance metrics */}
        <section>
          <h2 className="text-[1.1rem] font-medium mb-[var(--spacing-xs)]">Core Web Vitals</h2>
          <div className="grid grid-cols-2 gap-[var(--spacing-sm)]">
            <div className="flex flex-col items-center border rounded-lg p-[var(--spacing-sm)] shadow-sm">
              <span className="text-zinc-500 text-[0.8rem]">LCP</span>
              <span className="font-bold">-- ms</span>
            </div>
            <div className="flex flex-col items-center border rounded-lg p-[var(--spacing-sm)] shadow-sm">
              <span className="text-zinc-500 text-[0.8rem]">FID</span>
              <span className="font-bold">-- ms</span>
            </div>
            <div className="flex flex-col items-center border rounded-lg p-[var(--spacing-sm)] shadow-sm">
              <span className="text-zinc-500 text-[0.8rem]">CLS</span>
              <span className="font-bold">--</span>
            </div>
            <div className="flex flex-col items-center border rounded-lg p-[var(--spacing-sm)] shadow-sm">
              <span className="text-zinc-500 text-[0.8rem]">INP</span>
              <span className="font-bold">-- ms</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Wait for DOM to be fully loaded before rendering
const renderApp = () => {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    console.error('Root element not found - this should not happen if DOM is loaded');
    return;
  }

  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Popup />
    </React.StrictMode>,
  );
};

// Use DOMContentLoaded to ensure the DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  // DOM already loaded, render immediately
  renderApp();
}
