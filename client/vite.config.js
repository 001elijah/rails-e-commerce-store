import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      fallback: "/404.html",
    },
  },
  plugins: [react()],
  base: "/rails-e-commerce-store",
});
