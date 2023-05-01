import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@root": new URL("./src/", import.meta.url).pathname,
      "@components": new URL("./src/components", import.meta.url).pathname,
      "@hooks": new URL("./src/hooks", import.meta.url).pathname,
      "@pages": new URL("./src/pages", import.meta.url).pathname,
      "@assets": new URL("./src/assets", import.meta.url).pathname,
      "@utils": new URL("./src/utils", import.meta.url).pathname,
      "@routes": new URL("./src/routes", import.meta.url).pathname,
    },
  },
});
