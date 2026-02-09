import { HTMLAttributes, forwardRef } from 'react';

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
    value: number; // 0 to 100
    label?: string; // e.g. "Step 1/5"
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
    ({ className, value, label, ...props }, ref) => {

        // Ensure value is between 0 and 100
        const clampedValue = Math.min(Math.max(value, 0), 100);

        return (
            <div className={`w-full ${className || ''}`} {...props} ref={ref}>
                {label && (
                    <div className="mb-2 flex justify-between text-sm font-medium text-slate-700">
                        <span>Progress</span>
                        <span>{label}</span>
                    </div>
                )}
                <div className="h-2.5 w-full rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                    <div
                        className="h-full bg-indigo-600 transition-all duration-300 ease-in-out"
                        style={{ width: `${clampedValue}%` }}
                        role="progressbar"
                        aria-valuenow={clampedValue}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    />
                </div>
            </div>
        );
    }
);
ProgressBar.displayName = "ProgressBar";

export { ProgressBar };
