'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AccessibilityToggle } from "@/components/ui/AccessibilityToggle";
import { Home, Download, Share2, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface SkillScore {
    skill: string;
    percentage: number;
    feedback: string;
}

interface AssessmentResult {
    overall_score: number;
    skill_scores: SkillScore[];
    summary_feedback: string;
}

export default function Report() {
    const router = useRouter();
    const { user } = useAuth();
    const [result, setResult] = useState<AssessmentResult | null>(null);

    useEffect(() => {
        // Retrieve result from localStorage
        const storedResult = localStorage.getItem('assessmentResult');
        if (storedResult) {
            setResult(JSON.parse(storedResult));
        } else {
            // If no result found, redirect back to dashboard
            router.push('/dashboard');
        }
    }, [router]);

    if (!result) return <div className="p-10 text-center">Loading Report...</div>;

    return (
        <div className="min-h-screen bg-vibrant-mesh flex flex-col items-center py-10 px-6 relative">
            <AccessibilityToggle />

            <main className="w-full max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">

                {/* Header Section */}
                <div className="text-center space-y-4 mb-8">
                    <Badge variant="default" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-none px-4 py-1.5 text-sm">
                        Assessment Completed
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                        Your Performance Report
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Great job, {user?.full_name || 'Candidate'}! Here is a breakdown of your technical assessment.
                    </p>
                </div>

                {/* Score Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Overall Score */}
                    <Card className="col-span-1 md:col-span-1 flex flex-col items-center justify-center p-8 bg-indigo-600 text-white shadow-xl shadow-indigo-500/20 border-none relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                        <h3 className="relative z-10 text-indigo-100 font-medium uppercase tracking-widest text-sm mb-2">Overall Score</h3>
                        <div className="relative z-10 text-7xl font-bold mb-2 tracking-tighter">
                            {result.overall_score}
                        </div>
                        <span className="relative z-10 text-indigo-200 font-medium">out of 100</span>
                    </Card>

                    {/* Summary Feedback */}
                    <Card className="col-span-1 md:col-span-2 p-8 flex flex-col justify-center bg-white/80 backdrop-blur-md shadow-lg border-slate-100">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            Summary
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            {result.summary_feedback}
                        </p>
                    </Card>
                </div>

                {/* Skills Breakdown */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-800 ml-1">Skill Breakdown</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {result.skill_scores.map((skill, index) => (
                            <Card key={index} noPadding className="p-6 flex flex-col md:flex-row gap-6 items-center bg-white shadow-sm hover:shadow-md transition-shadow duration-300 border-slate-100">

                                {/* Skill Label & Progress */}
                                <div className="w-full md:w-1/3 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-slate-700 capitalize">{skill.skill.replace('_', ' ')}</span>
                                        <span className="font-mono text-slate-500 font-bold">{skill.percentage}%</span>
                                    </div>
                                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-indigo-500 rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${skill.percentage}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Specific Feedback */}
                                <div className="w-full md:w-2/3 pl-0 md:pl-6 md:border-l border-slate-100">
                                    <p className="text-slate-600 text-sm italic">
                                        "{skill.feedback}"
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Actions Footer */}
                <div className="flex justify-center gap-4 pt-8">
                    <Button variant="outline" onClick={() => router.push('/dashboard')} className="px-6 h-12 text-base">
                        <Home className="w-4 h-4 mr-2" /> Back to Dashboard
                    </Button>
                    <Button variant="ghost" className="px-6 h-12 text-base text-slate-500">
                        <Download className="w-4 h-4 mr-2" /> Download PDF
                    </Button>
                </div>

            </main>
        </div>
    );
}
