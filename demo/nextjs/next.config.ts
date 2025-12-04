import type { NextConfig } from "next";

export default {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
} satisfies NextConfig;
