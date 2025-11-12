import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command, isSsrBuild }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssr: {
    noExternal: ['react-helmet-async', 'react-router-dom'],
  },
  build: {
    rollupOptions: {
      output: {
        // Only apply manualChunks for client builds, not SSR builds
        ...(isSsrBuild ? {} : {
          manualChunks: (id) => {
            // Aggressive code splitting for better performance
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
                return 'react-vendor';
              }
              if (id.includes('@tanstack/react-query')) {
                return 'query-vendor';
              }
              if (id.includes('@radix-ui')) {
                return 'ui-vendor';
              }
              if (id.includes('@supabase')) {
                return 'supabase-vendor';
              }
              if (id.includes('lucide-react')) {
                return 'icons-vendor';
              }
              // Split other vendor code
              return 'vendor';
            }
            // Split route pages
            if (id.includes('src/pages/')) {
              const pageName = id.split('src/pages/')[1].split('.')[0];
              return `page-${pageName}`;
            }
          },
        }),
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 500,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Aggressive minification
    minify: 'esbuild',
    target: 'es2015',
    // Remove console and debugger in production
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
  },
}));
