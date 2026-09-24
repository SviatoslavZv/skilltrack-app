import { getStoryblokApi } from "@/lib/storyblok";
import { formatDuration } from "@/lib/format-duration";
import type { CourseContent } from "@/lib/storyblok-types";

interface TrackPageProps {
    params: Promise<{ slug: string }>;
}

export default async function TrackPage({ params }: TrackPageProps) {
    const { slug } = await params;
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
        version: "published",
        resolve_relations: "course.direction",
    });

    const course = data.story.content as CourseContent;
    const sortedLessons = [...course.lessons].sort(
        (a, b) => Number(a.order) - Number(b.order)
    );
    const totalMinutes = sortedLessons.reduce(
        (sum, lesson) => sum + Number(lesson.durationMinutes),
        0
    );

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
                        </li>
                    ))}
                </ol>
            </div>
        </main>
    );
}