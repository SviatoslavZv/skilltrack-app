import { cache } from "react";
import { notFound } from "next/navigation";
import { getStoryblokApi } from "@/lib/storyblok";
import type {
  CourseStory,
  DirectionStory,
  ResolvedCourseStory,
} from "@/lib/storyblok-types";

function byOrder<T extends { content: { order: string } }>(a: T, b: T) {
  return Number(a.content.order) - Number(b.content.order);
}

const MEMO_TTL_MS = 10_000;
const memo = new Map<string, { at: number; value: Promise<unknown> }>();

function memoize<T>(key: string, load: () => Promise<T>): Promise<T> {
  const hit = memo.get(key);

  if (hit && Date.now() - hit.at < MEMO_TTL_MS) {
    return hit.value as Promise<T>;
  }

  const value = load();
  memo.set(key, { at: Date.now(), value });
  value.catch(() => memo.delete(key));

  return value;
}

async function loadStory(slug: string, extraParams: Record<string, string> = {}) {
  const storyblokApi = getStoryblokApi();

  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: "published",
      cv: Date.now(),
      ...extraParams,
    });

    return data.story;
  } catch (error) {
    const status = (error as { status?: number })?.status;

    if (status === 404) {
      notFound();
    }

    throw new Error(
      `Failed to load "${slug}" from Storyblok (status: ${status ?? "network error"})`,
    );
  }
}

export const getDirections = cache(() =>
  memoize("directions", async () => {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get("cdn/stories", {
      content_type: "direction",
      version: "published",
      per_page: 100,
      cv: Date.now(),
    });

    return (data.stories as DirectionStory[]).sort(byOrder);
  }),
);

export const getCourses = cache(() =>
  memoize("courses", async () => {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get("cdn/stories", {
      content_type: "course",
      version: "published",
      per_page: 100,
      cv: Date.now(),
    });

    return (data.stories as CourseStory[]).sort(byOrder);
  }),
);

export async function getCoursesByDirection(directionUuid: string) {
  const courses = await getCourses();

  return courses.filter((course) => course.content.direction === directionUuid);
}

export const getDirectionBySlug = cache(async (slug: string) => {
  const story = await loadStory(slug);

  if (story.content.component !== "direction") {
    notFound();
  }

  return story as DirectionStory;
});

export const getCourseBySlug = cache(async (slug: string) => {
  const story = await loadStory(slug, { resolve_relations: "course.direction" });

  if (story.content.component !== "course") {
    notFound();
  }

  return story as ResolvedCourseStory;
});