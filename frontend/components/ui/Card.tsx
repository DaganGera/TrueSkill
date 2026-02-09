import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    noPadding?: boolean;
    interactive?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, noPadding = false, interactive = false, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "bg-white rounded-xl border border-slate-200 shadow-sm transition-all duration-200",
                    interactive && "hover:shadow-md hover:border-indigo-200 cursor-pointer",
                    noPadding ? "" : "p-6",
                    className
                )}
                {...props}
            />
        );
    }
);
Card.displayName = "Card";

export { Card };
