import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, User, Briefcase, CheckCircle2, Sparkles, Zap, Shield } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export default function Home() {
    return (
        <main className="min-h-screen bg-vibrant-mesh flex flex-col items-center justify-center p-6 lg:p-12 relative overflow-hidden">

            {/* Top Auth Bar */}
            <div className="absolute top-6 right-6 z-20 animate-in fade-in slide-in-from-top-4 duration-700">
                <Link href="/login">
                    <Button variant="ghost" className="font-semibold text-slate-600 hover:text-indigo-600 hover:bg-white/50">
                        Sign In
                    </Button>
                </Link>
            </div>

            <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-16 items-center z-10">

                {/* Left Column: Hero Content */}
                <div className="space-y-8 animate-in slide-in-from-bottom-10 fade-in duration-1000">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 border border-indigo-100 backdrop-blur-sm text-indigo-700 text-xs font-semibold uppercase tracking-wide shadow-sm">
                        <Sparkles className="w-3 h-3" />
                        <span>AI-Powered • Inclusive • Fair</span>
                    </div>

                    <div className="space-y-6">
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                            Uncover <span className="gradient-text">potential</span> <br />
                            beyond the resume.
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                            The world's first accessibility-first skill evaluation platform. Validated skills, reduced bias, and opportunities for everyone.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link href="/register">
                            <Button size="lg" variant="gradient" className="rounded-full px-8 h-14 text-base shadow-xl shadow-indigo-500/30">
                                Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-base bg-white/50 border-white hover:bg-white transition-all backdrop-blur-sm">
                            View Demo
                        </Button>
                    </div>

                    <div className="pt-8 flex flex-wrap gap-6 text-sm text-slate-600 font-medium">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/40 border border-white/50">
                            <Shield className="w-4 h-4 text-emerald-600" />
                            <span>Bias-Free Logic</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/40 border border-white/50">
                            <Zap className="w-4 h-4 text-amber-500" />
                            <span>Instant Analysis</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/40 border border-white/50">
                            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                            <span>WCAG 2.1 AA</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Glass Cards */}
                <div className="grid gap-6 animate-in slide-in-from-right-10 fade-in duration-1000 delay-200">
                    <Link href="/register" className="group outline-none">
                        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group-hover:-translate-y-1 transition-transform duration-300 shadow-lg hover:shadow-xl hover:shadow-indigo-500/10">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <User className="w-32 h-32 -rotate-12 transform translate-x-8 -translate-y-8 text-indigo-600" />
                            </div>
                            <div className="flex items-start gap-5 relative z-10">
                                <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30">
                                    <User className="w-6 h-6" />
                                </div>
                                <div className="space-y-1 flex-1">
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">I am a Candidate</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        Showcase your skills with fair assessments. Get hired for what you can actually do.
                                    </p>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all self-center">
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link href="/register" className="group outline-none">
                        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group-hover:-translate-y-1 transition-transform duration-300 shadow-lg hover:shadow-xl hover:shadow-emerald-500/10">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Briefcase className="w-32 h-32 -rotate-12 transform translate-x-8 -translate-y-8 text-emerald-600" />
                            </div>
                            <div className="flex items-start gap-5 relative z-10">
                                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30">
                                    <Briefcase className="w-6 h-6" />
                                </div>
                                <div className="space-y-1 flex-1">
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">I am a Recruiter</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        Find top talent without the noise. Data-driven hiring that eliminates bias.
                                    </p>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all self-center">
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    );
}
