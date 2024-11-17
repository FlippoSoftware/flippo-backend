import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  sassOptions: {
    includePaths: [
      path.join(__dirname, "styles"),
      path.join(__dirname, "src/settings/styles/"),
      path.join(__dirname, "node_modules")
    ],
    loadPaths: ["./src/settings/styles/"],
    implementation: "sass-embedded",
    silenceDeprecations: ["legacy-js-api"]
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "unsafe-none"
          }
        ]
      }
    ];
  }
};

export default nextConfig; //withNextIntl(nextConfig);
