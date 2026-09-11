import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  // Vercel and Docker both use Next.js's standard .next production output.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
};
export default nextConfig;
