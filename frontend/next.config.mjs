/** @type {import('next').NextConfig} */

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  sassOptions: { includePaths: [path.join(__dirname, "styles")] },
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

export default nextConfig;
