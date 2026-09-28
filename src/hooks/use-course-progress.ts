import { useProgressStore } from "@/stores/progress-store";

export function useCourseProgress(lessonIds: string[]) {
  const completed = useProgressStore(
    (state) =>
      lessonIds.filter((id) => state.completedLessonIds.includes(id)).length,
  );
  const total = lessonIds.length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return { completed, total, percent };
}