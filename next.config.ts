import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Emits a self-contained server bundle so the runtime image does not need
  // the full node_modules tree.
  output: "standalone",
  async rewrites() {
    if (process.env.NODE_ENV !== "development") return [];
    const backend = process.env.PORTFOLIO_API_URL ?? "http://127.0.0.1:8001";
    return ["/admin/:path*", "/portfolio-media/:path*", "/api/portfolio"].map(source => ({ source, destination: `${backend}${source}` }));
  },
};

export default nextConfig;
