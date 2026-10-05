import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
}

// The share images live in src/app (opengraph-image.png, twitter-image.png).
// Page-level openGraph/twitter replace the root ones, so they are listed here too.
const shareImageAlt = `${siteConfig.name}: free, curated learning tracks for modern web development`;

export function buildPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      url: path,
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: shareImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [
        {
          url: "/twitter-image.png",
          width: 1200,
          height: 630,
          alt: shareImageAlt,
        },
      ],
    },
  };
}