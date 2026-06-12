import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
  // Add this block:
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "http://localhost:1337/uploads/:path*", // Proxies requests to Strapi
      },
    ];
  },
};

export default nextConfig;