/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    // environment: "happy-dom", // Disabled when browser mode is enabled
    setupFiles: "./test/setup.ts",
    exclude: ["./node_modules/**"],
    passWithNoTests: true,
    // Browser mode for E2E-like testing with real browser
    browser: {
      enabled: true,
      instances: [
        {
          browser: "firefox",
        },
      ],
      provider: playwright(),
      headless: true,
    },
  },
});
