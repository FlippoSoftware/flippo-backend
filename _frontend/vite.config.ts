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
  esbuild: {
    jsxInject: `import React from 'react'`
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@env': '/src/shared/env',
      '@hooks': '/src/shared/hooks',
      '@i18n': '/src/i18n',
      '@icons': '/src/shared/icons',
      '@schemas': '/src/shared/schemas',
      '@settings': '/src/settings',
      '@styles': '/src/settings/styles',
      '@ui': '/src/shared/ui',
      '@utils': '/src/shared/utils',
      '@widgets': '/src/widgets'
    }
  },
  server: {
    host: '127.0.0.1',
    port: 3030
  }
});
