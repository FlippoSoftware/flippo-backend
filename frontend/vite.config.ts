import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  css: {
    modules: {
      localsConvention: 'camelCase'
    },
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        loadPaths: ['./src/settings/styles/'],
        style: 'compressed'
      }
    }
  },
  envPrefix: 'FLIPPO_',
  esbuild: {
    jsxInject: `import React from 'react'`
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@app': '/src/app',
      '@modules': '/src/modules',
      '@pages': '/src/pages',
      '@settings': '/src/settings',
      '@shared': '/src/shared',
      '@widgets': '/src/widgets'
    }
  },
  server: {
    host: '127.0.0.1',
    port: 3030
  }
});
