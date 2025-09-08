import type { NextConfig } from "next";
import type { Configuration, RuleSetRule } from "webpack";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['cdn-uploads.huggingface.co', 'api.farmbasket.by', 'http://localhost:8000'],
  },

  webpack(config: Configuration) {
    const fileLoaderRule = config.module?.rules?.find((rule) =>
      typeof rule === "object" &&
      rule !== null &&
      "test" in rule &&
      rule.test instanceof RegExp &&
      rule.test.test(".svg")
    ) as RuleSetRule | undefined;

    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    config.module?.rules?.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/, 
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
