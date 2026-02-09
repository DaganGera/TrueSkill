'use client';
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Search, Filter, Briefcase, ChevronDown, Download, Users, Star, BrainCircuit } from "lucide-react";
import Link from "next/link";

export default function HRDashboard() {
    const candidates = [
        { id: '2f8a9...b1e', role: 'Full Stack', score: 92, skills: ['React', 'Node.js'], status: 'Recommended', date: '2h ago' },
        { id: '9c3d4...a7f', role: 'Data Scientist', score: 88, skills: ['Python', 'SQL'], status: 'Review', date: '5h ago' },
        { id: 'e1b2c...5d9', role: 'Backend Dev', score: 76, skills: ['Java', 'Spring'], status: 'Passed', date: '1d ago' },
        { id: '4a5b6...8e2', role: 'Frontend Dev', score: 65, skills: ['Vue', 'CSS'], status: 'Borderline', date: '2d ago' },
        { id: '7f8e9...1c3', role: 'DevOps', score: 95, skills: ['AWS', 'Docker'], status: 'Recommended', date: '3d ago' },
    ];

    return (
        <div className="min-h-screen bg-vibrant-mesh flex flex-col">

            {/* Top Navigation */}
            <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-indigo-700 text-lg">
                        <div className="p-1.5 bg-indigo-600 rounded text-white"><Users className="w-5 h-5" /></div>
                        TalentAI <span className="text-slate-400 font-normal">Recruiter</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost" size="sm">Switch to Candidate View</Button>
                        </Link>
                        <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300"></div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full space-y-8 animate-in fade-in duration-500">

                {/* Header Stats */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Talent Pool</h1>
                        <p className="text-slate-600 mt-1">Real-time assessment results from diverse candidates.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="text-slate-600">
                            <Download className="w-4 h-4 mr-2" /> Export CSV
                        </Button>
                        <Button>
                            <Briefcase className="w-4 h-4 mr-2" /> Create Job Post
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="flex flex-row items-center justify-between p-6 glass-card border-none shadow-lg hover:shadow-xl hover:shadow-indigo-500/10 transition-all">
                        <div>
                            <p className="text-sm font-medium text-slate-500 mb-1">Total Candidates</p>
                            <p className="text-3xl font-bold text-slate-900">1,248</p>
                        </div>
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                            <Users className="w-6 h-6" />
                        </div>
                    </Card>
                    <Card className="flex flex-row items-center justify-between p-6 glass-card border-none shadow-lg hover:shadow-xl hover:shadow-emerald-500/10 transition-all">
                        <div>
                            <p className="text-sm font-medium text-slate-500 mb-1">Top Performers (90%+)</p>
                            <p className="text-3xl font-bold text-emerald-600">142</p>
                        </div>
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                            <Star className="w-6 h-6" />
                        </div>
                    </Card>
                    <Card className="flex flex-row items-center justify-between p-6 glass-card border-none shadow-lg hover:shadow-xl hover:shadow-amber-500/10 transition-all">
                        <div>
                            <p className="text-sm font-medium text-slate-500 mb-1">Avg. Bias Score</p>
                            <p className="text-3xl font-bold text-amber-600">0.05</p>
                        </div>
                        <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
                            <BrainCircuit className="w-6 h-6" />
                        </div>
                    </Card>
                </div>

                {/* Filters & Table */}
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input placeholder="Search by hashed ID or skills..." className="pl-10" />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="text-slate-600">
                                <Filter className="w-4 h-4 mr-2" /> Role
                                <ChevronDown className="w-3 h-3 ml-2 opacity-50" />
                            </Button>
                            <Button variant="outline" className="text-slate-600">
                                Score
                                <ChevronDown className="w-3 h-3 ml-2 opacity-50" />
                            </Button>
                        </div>
                    </div>

                    <Card noPadding className="overflow-hidden border border-slate-200 shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                    <tr>
                                        <th className="px-6 py-4">Candidate ID</th>
                                        <th className="px-6 py-4">Role</th>
                                        <th className="px-6 py-4">Score</th>
                                        <th className="px-6 py-4">Top Skills</th>
                                        <th className="px-6 py-4">AI Rec.</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {candidates.map((candidate) => (
                                        <tr key={candidate.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4 font-mono text-xs text-slate-600">{candidate.id}</td>
                                            <td className="px-6 py-4 text-slate-900 font-medium">{candidate.role}</td>
                                            <td className="px-6 py-4">
                                                <Badge
                                                    variant={candidate.score >= 90 ? 'success' : candidate.score >= 75 ? 'default' : 'warning'}
                                                    className="min-w-[3rem] justify-center"
                                                >
                                                    {candidate.score}%
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-1.5 flex-wrap">
                                                    {candidate.skills.map(skill => (
                                                        <span key={skill} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded border border-slate-200">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge variant={
                                                    candidate.status === 'Recommended' ? 'success' :
                                                        candidate.status === 'Review' ? 'warning' : 'neutral'
                                                } >
                                                    {candidate.status}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 text-sm">{candidate.date}</td>
                                            <td className="px-6 py-4 text-right">
                                                <Link href="/report">
                                                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                        View Report
                                                    </Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
}
