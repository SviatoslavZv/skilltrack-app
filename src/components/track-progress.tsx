"use client";

import { ProgressBar } from "@/components/progress-bar";
import type { ProgressBarVariant } from "@/components/progress-bar";
import { useCourseProgress } from "@/hooks/use-course-progress";

const LABEL_CLASSES: Record<ProgressBarVariant, string> = {
    "on-light": "text-accent",
    "on-dark": "text-on-dark-muted",
};

interface TrackProgressProps {
    lessonIds: string[];
    trackTitle: string;
    variant?: ProgressBarVariant;
}

export function TrackProgress({
    lessonIds,
    trackTitle,
    variant = "on-light",
}: TrackProgressProps) {
    const { completed, total } = useCourseProgress(lessonIds);

    return (
        <div>
            <p className={`text-sm ${LABEL_CLASSES[variant]}`}>
                {completed} of {total} lessons completed
            </p>
            <div className="mt-2">
                <ProgressBar
                    value={completed}
                    max={total}
                    label={`${trackTitle} progress`}
                    variant={variant}
                />
            </div>
        </div>
    );
}