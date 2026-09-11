import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  // Keep production verification artifacts separate from the dev server's HMR cache.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
};
export default nextConfig;
