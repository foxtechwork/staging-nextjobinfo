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
          manualChunks: {
            // Core React libraries
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            // React Query and related
            'query-vendor': ['@tanstack/react-query'],
            // UI components library
            'ui-vendor': [
              '@radix-ui/react-dialog',
              '@radix-ui/react-dropdown-menu',
              '@radix-ui/react-select',
              '@radix-ui/react-navigation-menu',
              '@radix-ui/react-accordion',
              '@radix-ui/react-tabs',
            ],
            // Supabase client
            'supabase-vendor': ['@supabase/supabase-js'],
            // Icons
            'icons-vendor': ['lucide-react'],
          },
        }),
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 600,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Use esbuild minification (faster and built-in)
    minify: 'esbuild',
  },
}));
