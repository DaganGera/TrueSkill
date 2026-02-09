import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react'; // Ensure lucide-react is installed

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gradient';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {

        const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

        const variants = {
            primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-500/20 focus-visible:ring-indigo-500 border border-transparent",
            secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-sm focus-visible:ring-slate-400",
            outline: "bg-transparent border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 focus-visible:ring-slate-400",
            ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-400",
            danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm shadow-red-500/20 focus-visible:ring-red-500 border border-transparent",
            gradient: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/30 border border-transparent hover:shadow-indigo-500/40"
        };

        const sizes = {
            sm: "h-9 px-3 text-xs",
            md: "h-11 px-5 text-sm", // Standard 44px+ touch target
            lg: "h-12 px-8 text-base",
            icon: "h-11 w-11 p-0"
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button };
