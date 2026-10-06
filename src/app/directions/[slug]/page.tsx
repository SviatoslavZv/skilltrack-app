import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import {
    getDirections,
    getDirectionBySlug,
    getCoursesByDirection,
} from "@/lib/storyblok-queries";
import { formatDuration } from "@/lib/format-duration";
import { getTotalMinutes } from "@/lib/course-stats";
import { TrackProgress } from "@/components/track-progress";

export const revalidate = 3600;

export async function generateStaticParams() {
    const directions = await getDirections();

    return directions.map((direction) => ({ slug: direction.slug }));
}

interface DirectionPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({
    params,
}: DirectionPageProps): Promise<Metadata> {
    const { slug } = await params;
    const { content } = await getDirectionBySlug(slug);

    return buildPageMetadata({
        title: content.title,
        description: content.description,
        path: `/directions/${slug}`,
    });
}

export default async function DirectionPage({ params }: DirectionPageProps) {
    const { slug } = await params;
    const direction = await getDirectionBySlug(slug);
    const directionCourses = await getCoursesByDirection(direction.uuid);

    return (
        <main>
            <header className="bg-dark px-6 py-6 text-on-dark">
                <div className="mx-auto max-w-4xl">
                    <h1 className="font-serif text-3xl">{direction.content.title}</h1>
                    <p className="mt-2 max-w-lg text-base text-on-dark-muted">
                        {direction.content.description}
                    </p>
                </div>
            </header>

            <div className="mx-auto max-w-4xl px-6 py-8">
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