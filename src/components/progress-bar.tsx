type ProgressBarVariant = "on-light" | "on-dark";

const TRACK_CLASSES: Record<ProgressBarVariant, string> = {
    "on-light": "bg-primary/15",
    "on-dark": "bg-on-dark/20",
};

const FILL_CLASSES: Record<ProgressBarVariant, string> = {
    "on-light": "bg-primary",
    "on-dark": "bg-on-dark",
};

interface ProgressBarProps {
    value: number;
    max: number;
    label: string;
    variant?: ProgressBarVariant;
}

export function ProgressBar({
    value,
    max,
    label,
    variant = "on-light",
}: ProgressBarProps) {
    const percent = max === 0 ? 0 : Math.round((value / max) * 100);

    return (
        <div
            role="progressbar"
            aria-label={label}
            aria-valuemin={0}
            aria-valuemax={max}
            aria-valuenow={value}
            className={`h-1.5 w-full overflow-hidden rounded-full ${TRACK_CLASSES[variant]}`}
        >
            <div
                className={`h-full rounded-full transition-[width] motion-reduce:transition-none ${FILL_CLASSES[variant]}`}
                style={{ width: `${percent}%` }}
            />
        </div>
    );
}