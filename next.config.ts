import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Emits a self-contained server bundle so the runtime image does not need
  // the full node_modules tree.
  output: "standalone",
};

export default nextConfig;
