import Link from "next/link";
import { getStoryblokApi } from "@/lib/storyblok";
import type { DirectionStory, CourseStory } from "@/lib/storyblok-types";

export const dynamic = "force-dynamic";

export default async function Home() {
  const storyblokApi = getStoryblokApi();

  const { data: directionsData } = await storyblokApi.get(
    "cdn/stories",
    { content_type: "direction", version: "published" }
  );
  const { data: coursesData } = await storyblokApi.get(
    "cdn/stories",
    { content_type: "course", version: "published" }
  );

  const directions = directionsData.stories as DirectionStory[];
  const courses = coursesData.stories as CourseStory[];

  return (
    <main>
      <header className="bg-dark px-6 py-10 text-on-dark">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-serif text-4xl">SkillTrack</h1>
          <p className="mt-2 max-w-lg text-base text-on-dark-muted">
            Free, curated learning tracks for modern web development.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-6 py-10">
        {directions.map((direction) => {
          const directionCourses = courses
            .filter((course) => course.content.direction === direction.uuid)
            .sort((a, b) => Number(a.content.order) - Number(b.content.order));

          return (
            <section key={direction.uuid} className="mb-12">
              <h2 className="font-serif text-2xl text-primary">
                {direction.content.title}
              </h2>
              <p className="mt-1 text-sm text-accent">
                {direction.content.description}
              </p>

              <ul className="mt-6 space-y-2">
                {directionCourses.map((course) => (
                  <li key={course.uuid}>
                    <Link
                      href={`/tracks/${course.slug}`}
                      className="flex items-center justify-between rounded-lg border border-primary/50 bg-surface p-4 hover:bg-primary/5"
                    >
                      <div>
                        <p className="font-serif text-lg">
                          {course.content.title}
                        </p>
                        <p className="mt-0.5 text-sm text-accent">
                          {course.content.description}
                        </p>
                      </div>
                      <span aria-hidden="true" className="text-accent">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </main>
  );
}