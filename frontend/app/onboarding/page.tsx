'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/context/AuthContext';
import { FileText, User, ChevronRight, Upload, BrainCircuit, Mic } from 'lucide-react';

export default function Onboarding() {
    const router = useRouter();
    const { user, login } = useAuth();
    const [step, setStep] = useState(1); // 1: Welcome, 2: Method Choice, 3: Manual Entry, 4: Review
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        full_name: user?.full_name || '',
        domain: '',
        experience: 0,
        skills: '', // Comma separated string for input
        accessibility_needs: [] as string[]
    });

    const handleManualSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Call API to update profile
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/auth/profile/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    ...formData,
                    skills: formData.skills.split(',').map(s => s.trim()),
                    accessibility_needs: formData.accessibility_needs
                })
            });

            if (res.status === 401) {
                alert("Session expired. Please log in again.");
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                router.push('/login');
                return;
            }

            if (!res.ok) throw new Error('Failed to update profile');

            const updatedUser = await res.json();
            // Update local context/storage if needed (simplified here)
            // Ideally auth context should support update, or we just rely on next fetch
            login(localStorage.getItem('token') || '', updatedUser); // Update context with new user data

            router.push('/dashboard');
        } catch (error) {
            console.error(error);
            alert("Failed to save profile. Use 'Register' if your server restarted (In-Memory DB).");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Mock parsing for now (in real app, send file to backend)
        setIsLoading(true);
        setTimeout(() => {
            setFormData({
                ...formData,
                full_name: "Uploaded Candidate", // In real app, extract from resume
                domain: "Full Stack Development", // Mock extraction
                experience: 3,
                skills: "React, Node.js, Python, TypeScript",
            });
            setIsLoading(false);
            setStep(3); // Go to manual entry for review
        }, 1500);
    };

    const toggleAccessibility = (need: string) => {
        setFormData(prev => ({
            ...prev,
            accessibility_needs: prev.accessibility_needs.includes(need)
                ? prev.accessibility_needs.filter(n => n !== need)
                : [...prev.accessibility_needs, need]
        }));
    };

    return (
        <div className="min-h-screen bg-vibrant-mesh flex items-center justify-center p-6">
            <Card className="max-w-2xl w-full glass-card p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

                {/* Progress Indicators */}
                <div className="flex gap-2 mb-8 justify-center">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`h-1.5 w-12 rounded-full transition-colors ${step >= i ? 'bg-indigo-600' : 'bg-slate-200'}`} />
                    ))}
                </div>

                {step === 1 && (
                    <div className="text-center space-y-6">
                        <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <User className="w-8 h-8" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900">Welcome to CareerAI!</h1>
                        <p className="text-lg text-slate-600 max-w-md mx-auto">
                            Let's maximize your potential. We'll tailor the assessment to your unique skills and experience.
                        </p>
                        <Button size="lg" variant="gradient" onClick={() => setStep(2)} className="mt-4">
                            Let's Get Started <ChevronRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-slate-900">How would you like to build your profile?</h2>
                            <p className="text-slate-600">Choose the fastest way for you.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <button
                                onClick={() => document.getElementById('resume-upload')?.click()}
                                className="p-6 border-2 border-dashed border-slate-300 rounded-xl hover:border-indigo-500 hover:bg-indigo-50/50 transition-all group text-left"
                            >
                                <div className="p-3 bg-white border border-slate-200 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                                    <Upload className="w-6 h-6 text-indigo-600" />
                                </div>
                                <h3 className="font-semibold text-slate-900">Upload Resume</h3>
                                <p className="text-sm text-slate-500 mt-1">Auto-fill your profile from your CV (PDF/TXT).</p>
                                <input id="resume-upload" type="file" className="hidden" accept=".txt,.pdf" onChange={handleResumeUpload} />
                            </button>

                            <button
                                onClick={() => setStep(3)}
                                className="p-6 border-2 border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50/50 transition-all group text-left bg-white/50"
                            >
                                <div className="p-3 bg-white border border-slate-200 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                                    <FileText className="w-6 h-6 text-emerald-600" />
                                </div>
                                <h3 className="font-semibold text-slate-900">Manual Entry</h3>
                                <p className="text-sm text-slate-500 mt-1">Fill in your details step-by-step.</p>
                            </button>
                        </div>
                        {isLoading && <p className="text-center text-indigo-600 animate-pulse">Analyzing resume...</p>}
                    </div>
                )}

                {step === 3 && (
                    <form onSubmit={handleManualSubmit} className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-slate-900">Complete Your Profile</h2>
                            <p className="text-slate-600">Verify your details below.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <Input
                                label="Full Name"
                                value={formData.full_name}
                                onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                                required
                            />
                            <Input
                                label="Years of Experience"
                                type="number"
                                value={formData.experience}
                                onChange={e => setFormData({ ...formData, experience: parseInt(e.target.value) })}
                                required
                            />
                        </div>

                        <Input
                            label="Target Domain (e.g., React, Python, Data Science)"
                            value={formData.domain}
                            onChange={e => setFormData({ ...formData, domain: e.target.value })}
                            required
                        />

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Key Skills (Comma separated)</label>
                            <textarea
                                className="w-full rounded-lg border border-slate-200 p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                rows={3}
                                value={formData.skills}
                                onChange={e => setFormData({ ...formData, skills: e.target.value })}
                                placeholder="e.g. JavaScript, AWS, System Design..."
                            />
                        </div>

                        {/* Accessibility Section */}
                        <div className="pt-4 border-t border-slate-200/60">
                            <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                                <BrainCircuit className="w-4 h-4 text-indigo-600" />
                                Accessibility & Accommodations
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                <button
                                    type="button"
                                    onClick={() => toggleAccessibility('screen_reader')}
                                    className={`px-4 py-2 rounded-full text-sm border transition-all ${formData.accessibility_needs.includes('screen_reader') ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-300 hover:border-indigo-400'}`}
                                >
                                    <Mic className="w-3 h-3 inline mr-2" /> Screen Reader Support
                                </button>
                                <button
                                    type="button"
                                    onClick={() => toggleAccessibility('neurodivergent')}
                                    className={`px-4 py-2 rounded-full text-sm border transition-all ${formData.accessibility_needs.includes('neurodivergent') ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-300 hover:border-indigo-400'}`}
                                >
                                    Neurodivergent Focus Mode
                                </button>
                                <button
                                    type="button"
                                    onClick={() => toggleAccessibility('dyslexia')}
                                    className={`px-4 py-2 rounded-full text-sm border transition-all ${formData.accessibility_needs.includes('dyslexia') ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-300 hover:border-indigo-400'}`}
                                >
                                    Dyslexia-Friendly Font
                                </button>
                            </div>
                        </div>

                        <Button type="submit" variant="gradient" size="lg" className="w-full mt-4" isLoading={isLoading}>
                            Save & Go to Dashboard
                        </Button>
                    </form>
                )}
            </Card>
        </div>
    );
}
