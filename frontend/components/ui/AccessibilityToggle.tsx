'use client';
import { useState, useEffect } from 'react';
import { Button } from './Button';
import { Moon, MousePointer2, Type, Eye } from 'lucide-react'; // Ensure lucide-react is installed

export function AccessibilityToggle() {

    const [highContrast, setHighContrast] = useState(false);
    const [largeText, setLargeText] = useState(false);
    const [focusMode, setFocusMode] = useState(false);

    useEffect(() => {
        // Apply classes to document body or root
        if (highContrast) document.documentElement.classList.add('high-contrast');
        else document.documentElement.classList.remove('high-contrast');

        if (largeText) document.documentElement.classList.add('text-lg');
        else document.documentElement.classList.remove('text-lg');

        // Focus mode might need page-specific handling or global CSS variable changes
    }, [highContrast, largeText, focusMode]);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex gap-2">
            <Button
                variant="secondary"
                size="sm"
                onClick={() => setHighContrast(!highContrast)}
                aria-label="Toggle High Contrast"
                title="High Contrast"
            >
                <Eye className="h-4 w-4" />
            </Button>
            <Button
                variant="secondary"
                size="sm"
                onClick={() => setLargeText(!largeText)}
                aria-label="Toggle Large Text"
                title="Large Text"
            >
                <Type className="h-4 w-4" />
            </Button>
            <Button
                variant="secondary"
                size="sm"
                onClick={() => setFocusMode(!focusMode)}
                aria-label="Toggle Focus Mode"
                title="Focus Mode"
            >
                <MousePointer2 className="h-4 w-4" />
            </Button>
        </div>
    );
}

// Global CSS (in global.css) needs to handle .high-contrast and .text-lg
// We'll update global.css next.
