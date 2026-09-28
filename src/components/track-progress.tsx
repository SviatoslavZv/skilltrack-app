"use client";

import { useCourseProgress } from "@/hooks/use-course-progress";

interface TrackProgressProps {
    lessonIds: string[];
}

export function TrackProgress({ lessonIds }: TrackProgressProps) {
    const { completed, total, percent } = useCourseProgress(lessonIds);

    return (
        <div className="mt-4 max-w-xs">
            <p className="text-sm text-on-dark-muted">
                {completed} of {total} lessons completed
            </p>
            <div
                role="progressbar"
                aria-label="Track progress"
                aria-valuemin={0}
                aria-valuemax={total}
                aria-valuenow={completed}
                className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-on-dark/20"
            >
                <div
                    className="h-full rounded-full bg-on-dark transition-[width] motion-reduce:transition-none"
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
}