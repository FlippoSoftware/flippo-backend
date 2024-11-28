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
      '@': '/src',
      '@api': '/src/shared/api/*',
      '@app': '/src/app',
      '@env': '/src/shared/env',
      '@exceptions': '/src/shared/exceptions/*',
      '@hooks': '/src/shared/hooks',
      '@icons': '/src/shared/icons',
      '@models': '/src/shared/models/*',
      '@modules': '/src/modules',
      '@pages': '/src/pages',
      '@query': '/src/shared/query/*',
      '@schemas': '/src/shared/schemas',
      '@settings': '/src/settings',
      '@shared': '/src/shared',
      '@styles': '/src/settings/styles',
      '@surreal': '/src/shared/surreal/*',
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
