import { create } from "zustand";
import { persist } from "zustand/middleware";

export const PROGRESS_STORAGE_KEY = "skilltrack-progress";

interface ProgressState {
  /** Storyblok `_uid` values of the lessons the user has completed. */
  completedLessonIds: string[];
  toggleLesson: (lessonId: string) => void;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      completedLessonIds: [],
      toggleLesson: (lessonId) =>
        set((state) => ({
          completedLessonIds: state.completedLessonIds.includes(lessonId)
            ? state.completedLessonIds.filter((id) => id !== lessonId)
            : [...state.completedLessonIds, lessonId],
        })),
      resetProgress: () => set({ completedLessonIds: [] }),
    }),
    {
      name: PROGRESS_STORAGE_KEY,
      version: 1,
      partialize: (state) => ({
        completedLessonIds: state.completedLessonIds,
      }),
    },
  ),
);