import { defineConfig } from "tsdown";

export default defineConfig({
  target: "es2022",
  entry: "src/index.ts",
  platform: "browser",
  sourcemap: true,
  unbundle: true,
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  banner: {
    js: "'use client';",
  },
});
