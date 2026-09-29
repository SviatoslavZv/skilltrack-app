import { useProgressStore } from "@/stores/progress-store";

export function useCourseProgress(lessonIds: string[]) {
  const completed = useProgressStore(
    (state) =>
      lessonIds.filter((id) => state.completedLessonIds.includes(id)).length,
  );
  const hasHydrated = useProgressStore((state) => state.hasHydrated);

  return { completed, total: lessonIds.length, hasHydrated };
}