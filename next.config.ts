import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'cdn.jsdelivr.net',
      'raw.githubusercontent.com',
      'www.vectorlogo.zone',
      'cdn.freelogovectors.net',
    ],
  },
};

export default nextConfig;
