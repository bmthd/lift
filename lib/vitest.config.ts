/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: "./test/setup.ts",
    exclude: ["./node_modules/**"],
    passWithNoTests: true,
  },
});
