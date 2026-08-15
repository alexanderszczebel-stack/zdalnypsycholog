import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "1048764051412235";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_META_PIXEL_ID: metaPixelId,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
