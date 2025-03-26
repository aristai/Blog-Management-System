import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2hp1ftv5ri2om.cloudfront.net",
        port: "",
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;
