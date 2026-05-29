import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  // Project Pages: https://<user>.github.io/<repo>/
  base: "/Portfolio/",
  plugins: [react(), tailwindcss()],
});
