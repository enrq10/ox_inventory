import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  base: './',
  publicDir: 'public',
  build: {
    outDir: 'build',
    target: 'esnext',
    cssCodeSplit: false,
    minify: false,
    rollupOptions: {
      output: {
        assetFileNames: (asset) => {
          if (asset.name && asset.name.endsWith('.css')) {
            return '[name].[hash][extname]'
          }
          return 'assets/[name].[hash][extname]'
        }
      }
    }
  },
  define: {
    'process.env': {},
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
});
