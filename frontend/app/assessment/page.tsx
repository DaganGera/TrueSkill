'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { AccessibilityToggle } from "@/components/ui/AccessibilityToggle";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { Volume2, ChevronRight, ChevronLeft, Flag } from "lucide-react";

export default function Assessment() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const totalSteps = 6;
    const progress = (currentStep / totalSteps) * 100;

    // Simulate loading state
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, [currentStep]);

    return (
        <div className="min-h-screen bg-vibrant-mesh flex flex-col items-center py-10 px-6 relative transition-colors duration-500">

            {/* Focus Mode Overlay (Conceptual - simplified UI) */}
            <AccessibilityToggle />

            {/* Header (Minimal for Focus) */}
            <header className="w-full max-w-3xl mb-12 flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-500 glass-card rounded-xl p-4">
                <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-emerald-500/50 shadow-sm"></span>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Live Assessment</span>
                </div>
                <Badge variant="neutral" className="font-mono">Time: 45:00</Badge>
            </header>

            {/* Main Content */}
            <main className="w-full max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">

                {/* Progress */}
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm font-medium text-slate-600">
                        <span>Question {currentStep} of {totalSteps}</span>
                        <span>{Math.round(progress)}% Completed</span>
                    </div>
                    <ProgressBar value={progress} className="h-2" />
                </div>

                {/* Question Card */}
                <Card noPadding className="overflow-hidden shadow-lg border-indigo-100/50 ring-1 ring-slate-100">
                    {isLoading ? (
                        <div className="p-8 space-y-6">
                            <Skeleton className="h-8 w-3/4 rounded-md" />
                            <Skeleton className="h-4 w-full rounded-md" />
                            <Skeleton className="h-4 w-5/6 rounded-md" />
                            <Skeleton className="h-32 w-full rounded-md mt-6" />
                        </div>
                    ) : (
                        <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-300">
                            {/* Question Header */}
                            <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-start">
                                <div className="space-y-4 max-w-2xl">
                                    <Badge variant="default" className="text-xs">System Design</Badge>
                                    <h2 className="text-2xl font-semibold text-slate-900 leading-snug">
                                        Design a scalable rate limiter for a distributed API.
                                    </h2>
                                    <p className="text-base text-slate-600 leading-relaxed">
                                        Considering a system handling 1M requests per second, explain your choice of algorithm (e.g., Token Bucket, Leaky Bucket) and data store (e.g., Redis).
                                    </p>
                                </div>
                                <Button variant="ghost" size="icon" title="Read Aloud" className="text-slate-400 hover:text-indigo-600">
                                    <Volume2 className="w-5 h-5" />
                                </Button>
                            </div>

                            {/* Answer Area */}
                            <div className="p-8 bg-white">
                                <textarea
                                    className="w-full min-h-[240px] p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-base resize-none font-sans leading-relaxed transition-all placeholder:text-slate-300"
                                    placeholder="Type your explanation here..."
                                    spellCheck={false}
                                />
                            </div>

                            {/* Footer Actions */}
                            <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex justify-between items-center">
                                <Button
                                    variant="ghost"
                                    onClick={() => {
                                        setIsLoading(true);
                                        setCurrentStep(Math.max(1, currentStep - 1));
                                    }}
                                    disabled={currentStep === 1}
                                    className="text-slate-500"
                                >
                                    <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                                </Button>

                                <div className="flex gap-3">
                                    <Button variant="outline" className="text-slate-500 hover:text-amber-600">
                                        <Flag className="w-4 h-4 mr-2" /> Flag
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            if (currentStep === totalSteps) {
                                                router.push('/report');
                                            } else {
                                                setIsLoading(true);
                                                setCurrentStep(Math.min(totalSteps, currentStep + 1));
                                            }
                                        }}
                                        className="px-8 shadow-md shadow-indigo-500/20"
                                    >
                                        {currentStep === totalSteps ? 'Finish' : 'Next Question'} <ChevronRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </Card>

            </main>
        </div>
    );
}
