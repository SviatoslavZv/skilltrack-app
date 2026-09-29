"use client";

import { useProgressStore } from "@/stores/progress-store";

interface LessonCheckboxProps {
    lessonId: string;
    lessonTitle: string;
}

export function LessonCheckbox({ lessonId, lessonTitle }: LessonCheckboxProps) {
    const isCompleted = useProgressStore((state) =>
        state.completedLessonIds.includes(lessonId),
    );
    const hasHydrated = useProgressStore((state) => state.hasHydrated);
    const toggleLesson = useProgressStore((state) => state.toggleLesson);

    return (
        <label
            className={`flex cursor-pointer items-center transition-opacity duration-200 ${hasHydrated ? "opacity-100" : "opacity-0"
                }`}
        >
            <input
                type="checkbox"
                checked={isCompleted}
                onChange={() => toggleLesson(lessonId)}
                disabled={!hasHydrated}
                className="h-5 w-5 cursor-pointer accent-primary"
            />
            <span className="sr-only">Mark “{lessonTitle}” as completed</span>
        </label>
    );
}