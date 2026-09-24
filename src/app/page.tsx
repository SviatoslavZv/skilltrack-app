import { getStoryblokApi } from "@/lib/storyblok";

interface Lesson {
  _uid: string;
  title: string;
  url: { url: string; target?: string };
  author: string;
  resourceType: string;
  order: number;
  durationMinutes: number;
}

interface CourseContent {
  title: string;
  description: string;
  lessons: Lesson[];
}

export default async function Home() {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/stories/html-css", {
    version: "published",
  });

  const course = data.story.content as CourseContent;
  const sortedLessons = [...course.lessons].sort((a, b) => a.order - b.order);

  return (
    <main className="flex min-h-screen flex-col items-center bg-background text-primary px-8 py-16">
      <h1 className="font-serif text-4xl">{course.title}</h1>
      <p className="mt-4 max-w-xl text-center">{course.description}</p>

      <ul className="mt-10 w-full max-w-xl space-y-3">
        {sortedLessons.map((lesson) => (
          <li key={lesson._uid} className="rounded bg-surface p-4">
            <a
              href={lesson.url.url}
              target={lesson.url.target === "_blank" ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="font-medium underline"
            >
              {lesson.order}. {lesson.title}
            </a>
            <p className="mt-1 text-sm">
              {lesson.author} · {lesson.durationMinutes} min · {lesson.resourceType}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}