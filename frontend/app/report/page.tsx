import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AccessibilityToggle } from "@/components/ui/AccessibilityToggle";
import { Badge } from "@/components/ui/Badge";
import { Download, Share2, ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";

export default function Report() {
    return (
        <div className="min-h-screen bg-vibrant-mesh pb-20">
            <AccessibilityToggle />

            <header className="bg-white/70 backdrop-blur-md border-b border-white/50 sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" className="hidden sm:flex">Back to Dashboard</Button>
                        <div className="h-6 w-px bg-slate-200 mx-2 hidden sm:block"></div>
                        <h1 className="text-base font-semibold text-slate-900">Skill Report: Full Stack Assessment</h1>
                        <Badge variant="success" className="ml-2">Passed</Badge>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" /> PDF
                        </Button>
                        <Button variant="primary" size="sm">
                            <Share2 className="w-4 h-4 mr-2" /> Share Profile
                        </Button>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-10 space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">

                {/* Summary Hero */}
                <section className="glass-card rounded-2xl p-8 shadow-sm border-none relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>

                    <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
                        {/* Score Chart (Pure CSS Conic Gradient) */}
                        <div className="relative w-40 h-40 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border-[12px] border-slate-100"></div>
                            <div
                                className="absolute inset-0 rounded-full border-[12px] border-indigo-600 border-r-transparent border-b-transparent -rotate-45"
                                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }} // Hack for semi-circle or use SVG for real usage
                            ></div>
                            {/* Fallback to simple SVG for professional look */}
                            <svg viewBox="0 0 36 36" className="w-40 h-40 absolute transform -rotate-90">
                                <path
                                    className="text-slate-100"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                />
                                <path
                                    className="text-indigo-600 drop-shadow-md"
                                    strokeDasharray="85, 100"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="text-center">
                                <span className="text-4xl font-bold text-slate-900 tracking-tighter">85%</span>
                                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Excellent</p>
                            </div>
                        </div>

                        <div className="flex-1 space-y-6 text-center md:text-left">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">You demonstrate Strong Proficiency.</h2>
                                <p className="text-slate-600 leading-relaxed max-w-xl">
                                    Your performance indicates readiness for <span className="font-semibold text-slate-900">Senior Developer</span> roles.
                                    You showed exceptional logic in System Design but could improve in Database Sharding optimization.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                                <div className="p-3 bg-slate-50 rounded-lg text-center md:text-left border border-slate-100">
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Duration</p>
                                    <p className="font-semibold text-slate-900">45m 20s</p>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-lg text-center md:text-left border border-slate-100">
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Percentile</p>
                                    <p className="font-semibold text-indigo-600">Top 12%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Breakdown Column */}
                    <div className="md:col-span-2 space-y-6">
                        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                            Domain Analysis <Badge variant="neutral">Deep Dive</Badge>
                        </h3>

                        <Card className="space-y-6">
                            {/* Item 1 */}
                            <div className="group">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="font-medium text-slate-700">System Design</span>
                                    <span className="text-sm font-bold text-emerald-600">92/100</span>
                                </div>
                                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full w-[92%] shadow-sm group-hover:bg-emerald-400 transition-colors"></div>
                                </div>
                            </div>

                            {/* Item 2 */}
                            <div className="group">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="font-medium text-slate-700">React Patterns & Hooks</span>
                                    <span className="text-sm font-bold text-indigo-600">88/100</span>
                                </div>
                                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-600 rounded-full w-[88%] shadow-sm group-hover:bg-indigo-500 transition-colors"></div>
                                </div>
                            </div>

                            {/* Item 3 */}
                            <div className="group">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="font-medium text-slate-700">Database Optimization</span>
                                    <span className="text-sm font-bold text-amber-600">65/100</span>
                                </div>
                                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-500 rounded-full w-[65%] shadow-sm group-hover:bg-amber-400 transition-colors"></div>
                                </div>
                            </div>
                        </Card>

                        {/* Recommendations */}
                        <div className="space-y-4 pt-4">
                            <h3 className="text-lg font-semibold text-slate-900">AI Recommendations</h3>
                            <div className="grid gap-4">
                                <Card interactive noPadding className="p-4 flex gap-4 items-start border-l-4 border-l-indigo-500">
                                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 text-sm">Review CAP Theorem</h4>
                                        <p className="text-sm text-slate-600 mt-1">
                                            Strengthen your understanding of Consistency vs Availability in distributed databases.
                                        </p>
                                    </div>
                                </Card>
                                <Card interactive noPadding className="p-4 flex gap-4 items-start border-l-4 border-l-amber-500">
                                    <div className="p-2 bg-amber-50 text-amber-600 rounded-lg shrink-0">
                                        <AlertCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 text-sm">Practice SQL Indexing</h4>
                                        <p className="text-sm text-slate-600 mt-1">
                                            Your query optimization was functional but could be 40% faster with proper indexing.
                                        </p>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-slate-900">Details</h3>
                        <Card className="divide-y divide-slate-100">
                            <div className="pb-4">
                                <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Candidate ID</span>
                                <div className="font-mono text-xs bg-slate-100 p-2 rounded text-slate-700 break-all border border-slate-200">
                                    a8f7c9e21...8b2
                                </div>
                            </div>
                            <div className="py-4">
                                <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Assessed By</span>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                                    <span className="text-sm font-medium text-slate-900">CareerAI Agent v1.2</span>
                                </div>
                            </div>
                            <div className="pt-4">
                                <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Accommodations Used</span>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <Badge variant="neutral">Extended Time</Badge>
                                    <Badge variant="neutral">High Contrast</Badge>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
