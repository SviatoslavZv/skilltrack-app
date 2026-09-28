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
    const toggleLesson = useProgressStore((state) => state.toggleLesson);

    return (
        <label className="flex cursor-pointer items-center">
            <input
                type="checkbox"
                checked={isCompleted}
                onChange={() => toggleLesson(lessonId)}
                className="h-5 w-5 cursor-pointer accent-primary"
            />
            <span className="sr-only">Mark “{lessonTitle}” as completed</span>
        </label>
    );
}