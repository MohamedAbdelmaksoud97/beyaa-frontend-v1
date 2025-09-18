import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // 👉 Output directly into backend/public
    outDir: path.resolve(__dirname, "../Desktop/Beyaa/public"),
    emptyOutDir: true, // remove old files before building
  },
  base: "/", // ✅ ensures assets load correctly
  server: {
    historyApiFallback: true, // ✅ fixes React Router reloads in dev
  },
});
