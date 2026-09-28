"use client";

import { ProgressBar } from "@/components/progress-bar";
import { useCourseProgress } from "@/hooks/use-course-progress";

interface TrackProgressProps {
    lessonIds: string[];
}

export function TrackProgress({ lessonIds }: TrackProgressProps) {
    const { completed, total } = useCourseProgress(lessonIds);

    return (
        <div className="mt-4 max-w-xs">
            <p className="text-sm text-on-dark-muted">
                {completed} of {total} lessons completed
            </p>
            <div className="mt-2">
                <ProgressBar
                    value={completed}
                    max={total}
                    label="Track progress"
                    variant="on-dark"
                />
            </div>
        </div>
    );
}