import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import stylelint from "vite-plugin-stylelint";

export default defineConfig({
  plugins: [
    vue(),
    stylelint()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
});
