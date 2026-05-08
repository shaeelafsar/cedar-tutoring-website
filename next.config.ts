import type { NextConfig } from "next";

const repoBasePath = "/cedar-tutoring-website";
const isGitHubPages = process.env.NEXT_PUBLIC_DEPLOY_TARGET === "github-pages";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  ...(isGitHubPages
    ? {
        basePath: repoBasePath,
        assetPrefix: `${repoBasePath}/`,
      }
    : {}),
};

export default nextConfig;
