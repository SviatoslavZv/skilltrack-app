import { notFound } from "next/navigation";
import { getStoryblokApi } from "@/lib/storyblok";
import { formatDuration } from "@/lib/format-duration";
import { getTotalMinutes } from "@/lib/course-stats";
import type { CourseContent } from "@/lib/storyblok-types";
import { getCacheBuster } from "@/lib/get-cache-buster";
import { LessonCheckbox } from "@/components/lesson-checkbox";
import { TrackProgress } from "@/components/track-progress";

export const dynamic = "force-dynamic";

interface TrackPageProps {
    params: Promise<{ slug: string }>;
}

async function getCourseStory(slug: string) {
    const storyblokApi = getStoryblokApi();

    try {
        const cacheBuster = getCacheBuster();
        const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
            version: "published",
            resolve_relations: "course.direction",
            ...(cacheBuster !== undefined && { cv: cacheBuster }),
        });

        return data.story;
    } catch {
        notFound();
    }
}

export default async function TrackPage({ params }: TrackPageProps) {
    const { slug } = await params;
    const story = await getCourseStory(slug);

    if (story.content.component !== "course") {
        notFound();
    }

    const course = story.content as CourseContent;
    const sortedLessons = [...course.lessons].sort(
        (a, b) => Number(a.order) - Number(b.order)
    );
    const totalMinutes = getTotalMinutes(sortedLessons);

    return (
        <main>
            <header className="bg-dark px-6 py-6 text-on-dark">
                <div className="mx-auto max-w-2xl">
                    <p className="text-sm text-on-dark-muted">
                        {course.direction.content.title}
                    </p>
                    <h1 className="mt-1 font-serif text-3xl">{course.title}</h1>
                    <p className="mt-2 max-w-lg text-base text-on-dark-muted">
                        {course.description}
                    </p>
                    <p className="mt-2 text-sm text-on-dark-muted">
                        ~ {formatDuration(totalMinutes)} · {sortedLessons.length} lessons
                    </p>
                    <div className="mt-4 max-w-xs">
                        <TrackProgress
                            lessonIds={sortedLessons.map((lesson) => lesson._uid)}
                            trackTitle={course.title}
                            variant="on-dark"
                        />
                    </div>
                </div>
            </header>

            <div className="mx-auto max-w-2xl px-6 py-8">
                <ol className="space-y-2">
                    {sortedLessons.map((lesson) => (
                        <li
                            key={lesson._uid}
                            className="flex gap-3 rounded-lg border border-primary/50 bg-surface p-3"
                        >
                            <span className="font-serif text-base text-accent">
                                {lesson.order.padStart(2, "0")}
                            </span>
                            <div>

                                <a
                                    href={lesson.url.url}
                                    target={lesson.url.target === "_blank" ? "_blank" : "_self"}
                                    rel="noopener noreferrer"
                                    className="font-serif text-base underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
                                >
                                    {lesson.title}
                                </a>
                                <p className="mt-0.5 text-sm text-accent">
                                    {lesson.author} · {lesson.resourceType} ·{" "}
                                    {formatDuration(Number(lesson.durationMinutes))}
                                </p>
                            </div>

                            <div className="ml-auto self-center pl-3">
                                <LessonCheckbox lessonId={lesson._uid} lessonTitle={lesson.title} />
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </main>
    );
}