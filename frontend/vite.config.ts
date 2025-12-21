import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@network": path.resolve(__dirname, "./src/network"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@miscellaneous": path.resolve(__dirname, "./src/miscellaneous"),
      "@css": path.resolve(__dirname, "./src/css"),
      "@dal": path.resolve(__dirname, "./src/dal"),
    },
  },
});
