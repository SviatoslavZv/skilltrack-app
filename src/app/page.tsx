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

  const allLessons = courses.flatMap((course) => course.content.lessons);
  const totalHours = Math.round(getTotalMinutes(allLessons) / 60);

  const stats = [
    { value: String(courses.length), label: "tracks" },
    { value: String(allLessons.length), label: "lessons" },
    { value: `~${totalHours} h`, label: "of learning" },
    { value: "$0", label: "free to use" },
  ];

  return (
    <main>
      <section className="bg-dark px-6 py-8 text-on-dark sm:py-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-medium tracking-wide text-on-dark-muted">
            Free · Hand-picked · No sign-up
          </p>
          <h1 className="mt-2 max-w-2xl font-serif text-2xl leading-tight sm:text-4xl">
            A clear path through the best free web development resources.
          </h1>
          <p className="mt-3 max-w-xl text-sm text-on-dark-muted sm:text-base">
            Each track is a short, ordered sequence of videos, articles and
            docs, checked by hand. You skip the search and just follow it.
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-on-dark-muted/20 pt-4 text-center sm:text-left sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-serif text-xl sm:text-2xl">{stat.value}</dt>
                <dd className="mt-0.5 text-xs text-on-dark-muted sm:text-sm">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-8 sm:py-10">
        <ul className="space-y-2">
          {directions.map((direction) => {
            const directionCourses = courses.filter(
              (course) => course.content.direction === direction.uuid,
            );
            const directionLessons = directionCourses.flatMap(
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
                      {formatDuration(getTotalMinutes(directionLessons))}
                    </p>
                    <div className="mt-3 max-w-xs">
                      <TrackProgress
                        lessonIds={directionLessons.map((lesson) => lesson._uid)}
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