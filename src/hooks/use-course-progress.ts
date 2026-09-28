import { useProgressStore } from "@/stores/progress-store";

export function useCourseProgress(lessonIds: string[]) {
  const completed = useProgressStore(
    (state) =>
      lessonIds.filter((id) => state.completedLessonIds.includes(id)).length,
  );

  return { completed, total: lessonIds.length };
}