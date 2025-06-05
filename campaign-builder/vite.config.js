import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import rollupNodePolyFill from "rollup-plugin-polyfill-node";

export default defineConfig({
  plugins: [react()],
  define: {
    global: "globalThis", // 👈 This is important
  },
  resolve: {
    alias: {
      global: "global",
      process: "process/browser",
      Buffer: "buffer",
    },
  },
  optimizeDeps: {
    include: ["process", "buffer", "global"],
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },
});
