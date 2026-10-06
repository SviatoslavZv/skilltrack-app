import Link from "next/link";
import { getDirections, getCourses } from "@/lib/storyblok-queries";
import { formatDuration } from "@/lib/format-duration";
import { getTotalMinutes } from "@/lib/course-stats";
import { TrackProgress } from "@/components/track-progress";

export const revalidate = 3600;

export default async function Home() {
  const [directions, courses] = await Promise.all([
    getDirections(),
    getCourses(),
  ]);

  return (
    <main>
      <header className="bg-dark px-6 py-10 text-on-dark">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-serif text-4xl">SkillTrack</h1>
          <p className="mt-2 max-w-lg text-base text-on-dark-muted">
            Free, curated learning tracks for modern web development.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-10">
        <ul className="space-y-2">
          {directions.map((direction) => {
            const directionCourses = courses.filter(
              (course) => course.content.direction === direction.uuid,
            );
            const allLessons = directionCourses.flatMap(
              (course) => course.content.lessons,
            );

            return (
              <li key={direction.uuid}>
                <Link
                  href={`/directions/${direction.slug}`}
                  className="flex items-center justify-between gap-4 rounded-lg border border-primary/50 bg-surface p-4 hover:bg-primary/5"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-serif text-lg">
                      {direction.content.title}
                    </p>
                    <p className="mt-0.5 text-sm text-accent">
                      {direction.content.description}
                    </p>
                    <p className="mt-2 text-sm text-accent">
                      {directionCourses.length} tracks · ~{" "}
                      {formatDuration(getTotalMinutes(allLessons))}
                    </p>
                    <div className="mt-3 max-w-xs">
                      <TrackProgress
                        lessonIds={allLessons.map((lesson) => lesson._uid)}
                        trackTitle={direction.content.title}
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