'use client';

import { useEffect, useState } from 'react';

export default function IntegrityGuard({ onViolation }: { onViolation: (msg: string) => void }) {
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                onViolation("Tab switch detected! Please stay on this tab.");
            }
        };

        const handleCopy = (e: ClipboardEvent) => {
            e.preventDefault();
            onViolation("Copying is disabled during assessment.");
        };

        const handlePaste = (e: ClipboardEvent) => {
            e.preventDefault();
            onViolation("Pasting is disabled during assessment.");
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        document.addEventListener("copy", handleCopy);
        document.addEventListener("paste", handlePaste);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            document.removeEventListener("copy", handleCopy);
            document.removeEventListener("paste", handlePaste);
        };
    }, [onViolation]);

    return (
        <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded text-xs">
            🛡️ Integrity Guard Active
        </div>
    );
}
