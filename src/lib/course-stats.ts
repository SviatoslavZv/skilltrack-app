import type { Lesson } from "@/lib/storyblok-types";

export function getTotalMinutes(
  lessons: Pick<Lesson, "durationMinutes">[],
): number {
  return lessons.reduce(
    (sum, lesson) => sum + Number(lesson.durationMinutes),
    0,
  );
}