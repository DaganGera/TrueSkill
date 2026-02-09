import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AccessibilityToggle } from "@/components/ui/AccessibilityToggle";
import { Badge } from "@/components/ui/Badge";
import { Play, FileText, CheckCircle, Clock, LayoutDashboard, Settings, User } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-vibrant-mesh flex">
            {/* Sidebar Navigation */}
            <aside className="w-64 border-r border-slate-200/50 bg-white/70 backdrop-blur-md fixed h-full hidden lg:flex flex-col p-6 z-20">
                <div className="flex items-center gap-2 mb-10 text-indigo-700 font-bold text-xl tracking-tight">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">C</div>
                    CareerAI
                </div>

                <nav className="space-y-1 flex-1">
                    <Link href="/dashboard">
                        <Button variant="ghost" className="w-full justify-start bg-slate-50 text-slate-900 font-semibold shadow-sm border-slate-200 border">
                            <LayoutDashboard className="w-4 h-4 mr-3" />
                            Dashboard
                        </Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button variant="ghost" className="w-full justify-start">
                            <FileText className="w-4 h-4 mr-3" />
                            My Assessments
                        </Button>
                    </Link>
                    <Link href="/report">
                        <Button variant="ghost" className="w-full justify-start">
                            <User className="w-4 h-4 mr-3" />
                            Profile
                        </Button>
                    </Link>
                </nav>

                <Link href="/">
                    <Button variant="ghost" className="w-full justify-start mt-auto text-slate-500 hover:text-red-600 hover:bg-red-50">
                        <Settings className="w-4 h-4 mr-3" />
                        Log Out
                    </Button>
                </Link>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 relative pb-20">
                <AccessibilityToggle />

                {/* Top Header */}
                <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 h-16 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Candidate Overview</h2>
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-right hidden sm:block">
                            <p className="font-medium text-slate-900">John Doe</p>
                            <p className="text-slate-500 text-xs">Full Stack Developer</p>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
                            J
                        </div>
                    </div>
                </header>

                <div className="max-w-5xl mx-auto px-8 py-10 space-y-10">

                    {/* Welcome */}
                    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Good morning, John.</h1>
                        <p className="text-slate-600 text-lg">
                            You have <span className="font-semibold text-indigo-600">1 pending assessment</span> to complete this week.
                        </p>
                    </section>

                    {/* Quick Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-slate-500 text-sm font-medium mb-1">Assessments</p>
                            <p className="text-2xl font-bold text-slate-900">4</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-slate-500 text-sm font-medium mb-1">Avg. Score</p>
                            <p className="text-2xl font-bold text-slate-900">88%</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-slate-500 text-sm font-medium mb-1">Top Skill</p>
                            <p className="text-2xl font-bold text-indigo-600">React</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-slate-500 text-sm font-medium mb-1">Rank</p>
                            <p className="text-2xl font-bold text-emerald-600">Top 5%</p>
                        </div>
                    </div>

                    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-900">Active Assessments</h3>
                            <Button variant="ghost" size="sm" className="text-indigo-600">View All</Button>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Main Active Card */}
                            <Card interactive className="border-indigo-100 shadow-md ring-1 ring-indigo-50/50 lg:col-span-2 flex flex-col sm:flex-row gap-6">
                                <div className="p-4 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center sm:w-24 sm:h-auto shrink-0">
                                    <Play className="w-8 h-8" />
                                </div>
                                <div className="flex-1 space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <Badge variant="default" className="mb-2">Recommended</Badge>
                                            <h3 className="text-xl font-semibold text-slate-900">Senior Full Stack Developer</h3>
                                        </div>
                                        <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-1 rounded-md flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> 60m
                                        </span>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        Evaluate your system design, React patterns, and Node.js architecture skills. tailored to your experience level.
                                    </p>
                                    <div className="pt-2">
                                        <Link href="/assessment">
                                            <Button className="w-full sm:w-auto">Start Assessment</Button>
                                        </Link>
                                    </div>
                                </div>
                            </Card>

                            {/* Secondary Card */}
                            <Card interactive className="flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="p-2 w-fit bg-emerald-50 text-emerald-600 rounded-lg">
                                        <CheckCircle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900">Python Basics</h3>
                                        <p className="text-slate-500 text-sm mt-1">Completed Feb 8</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium text-slate-700">Score</span>
                                            <span className="font-bold text-emerald-600">92/100</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 w-[92%]"></div>
                                        </div>
                                    </div>
                                </div>
                                <Link href="/report" className="mt-4">
                                    <Button variant="outline" className="w-full">View Report</Button>
                                </Link>
                            </Card>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
