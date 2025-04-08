import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    entry: {
      popup: './src/popup/index.tsx',
      background: './src/background/index.ts',
      content: './src/content/index.ts',
    },
  },
  output: {
    distPath: {
      root: 'dist',
      js: '',  // Put JS files at the root to match expected Chrome extension structure
      css: '',  // Put CSS files at the root level
      html: './',
    },
    cleanDistPath: true,
    inlineStyles: false,  // Do not inline styles to ensure separate CSS files are created
    assetPrefix: './' // Use relative paths instead of absolute ones for all assets
  },
  html: {
    template: './public/popup.html',
    inject: 'body',       // Inject scripts at the end of body, styles in head
    scriptLoading: 'blocking', // Ensure scripts load in correct order
  },
  tools: {
    bundlerChain: (chain) => {
      // Chrome extension specific configurations
      chain.output.filename('[name].js').chunkFilename('[name].chunk.js');
    },
  },
});
