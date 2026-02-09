import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'neutral' | 'success' | 'warning' | 'error';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant = 'default', ...props }, ref) => {
        const variants = {
            default: "bg-indigo-50 text-indigo-700 border-indigo-100",
            neutral: "bg-slate-100 text-slate-700 border-slate-200",
            success: "bg-emerald-50 text-emerald-700 border-emerald-100",
            warning: "bg-amber-50 text-amber-700 border-amber-100",
            error: "bg-red-50 text-red-700 border-red-100",
        };

        return (
            <span
                ref={ref}
                className={cn(
                    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    variants[variant],
                    className
                )}
                {...props}
            />
        );
    }
);
Badge.displayName = "Badge";

export { Badge };
