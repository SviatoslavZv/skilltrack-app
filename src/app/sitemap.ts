import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getDirections, getCourses } from "@/lib/storyblok-queries";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [directions, courses] = await Promise.all([
    getDirections(),
    getCourses(),
  ]);

  return [
    { url: siteConfig.url },
    ...directions.map((direction) => ({
      url: `${siteConfig.url}/directions/${direction.slug}`,
    })),
    ...courses.map((course) => ({
      url: `${siteConfig.url}/tracks/${course.slug}`,
    })),
  ];
}