import Link from "next/link";
import { notFound } from "next/navigation";
import { getStoryblokApi } from "@/lib/storyblok";
import { formatDuration } from "@/lib/format-duration";
import { getTotalMinutes } from "@/lib/course-stats";
import { TrackProgress } from "@/components/track-progress";
import type { DirectionStory, CourseStory } from "@/lib/storyblok-types";

export const revalidate = 3600;

export async function generateStaticParams() {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get("cdn/stories", {
        content_type: "direction",
        version: "published",
        per_page: 100,
        cv: Date.now(),
    });

    return (data.stories as { slug: string }[]).map((story) => ({
        slug: story.slug,
    }));
}

interface DirectionPageProps {
    params: Promise<{ slug: string }>;
}

async function getDirectionStory(slug: string) {
    const storyblokApi = getStoryblokApi();
    try {
        const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
            version: "published",
            cv: Date.now(),
        });
        return data.story;

    } catch (error) {
        const status = (error as { status?: number })?.status;

        if (status === 404) {
            notFound();
        }

        throw new Error(
            `Failed to load direction "${slug}" from Storyblok (status: ${status ?? "network error"})`,
        );
    }
}

async function getDirectionCourses(directionUuid: string) {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get("cdn/stories", {
        content_type: "course",
        version: "published",
        per_page: 100,
        cv: Date.now(),
    });

    return (data.stories as CourseStory[])
        .filter((course) => course.content.direction === directionUuid)
        .sort((a, b) => Number(a.content.order) - Number(b.content.order));
}

export default async function DirectionPage({ params }: DirectionPageProps) {
    const { slug } = await params;
    const story = await getDirectionStory(slug);

    if (story.content.component !== "direction") {
        notFound();
    }

    const direction = story as DirectionStory;
    const directionCourses = await getDirectionCourses(direction.uuid);

    return (
        <main>
            <header className="bg-dark px-6 py-6 text-on-dark">
                <div className="mx-auto max-w-2xl">
                    <h1 className="font-serif text-3xl">{direction.content.title}</h1>
                    <p className="mt-2 max-w-lg text-base text-on-dark-muted">
                        {direction.content.description}
                    </p>
                </div>
            </header>

            <div className="mx-auto max-w-2xl px-6 py-8">
                <ul className="space-y-2">
                    {directionCourses.map((course) => {
                        const lessons = course.content.lessons;

                        return (
                            <li key={course.uuid}>
                                <Link
                                    href={`/tracks/${course.slug}`}
                                    className="flex items-center justify-between gap-4 rounded-lg border border-primary/50 bg-surface p-4 hover:bg-primary/5"
                                >
                                    <div className="min-w-0 flex-1">
                                        <p className="font-serif text-lg">{course.content.title}</p>
                                        <p className="mt-0.5 text-sm text-accent">
                                            {course.content.description}
                                        </p>
                                        <p className="mt-2 text-sm text-accent">
                                            {lessons.length} lessons · ~{" "}
                                            {formatDuration(getTotalMinutes(lessons))}
                                        </p>
                                        <div className="mt-3 max-w-xs">
                                            <TrackProgress
                                                lessonIds={lessons.map((lesson) => lesson._uid)}
                                                trackTitle={course.content.title}
                                            />
                                        </div>
                                    </div>
                                    <span aria-hidden="true" className="shrink-0 text-accent">
                                        →
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </main>
    );
}