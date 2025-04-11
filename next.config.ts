import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ibb.co.com", // Correct the hostname to 'ibb.co'
        pathname: "/**", // Matches any path after the domain
      },
    ],
  },
};

export default nextConfig;
