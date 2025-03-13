import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Enables static export mode
  distDir: 'out',   // (Optional) Default export folder
  images: {
    unoptimized: true, // Required if using Next.js Image component
  },
};

export default nextConfig;
