import { defineConfig } from "tsdown"

export default defineConfig({
  target: "es2022",
  banner: {
    js: "'use client';",
  },
  entry: "lib/index.ts",
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  external: ["react", "react/jsx-runtime"],
})