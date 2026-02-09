'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        role: 'student'
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('http://127.0.0.1:8000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.detail || 'Registration failed');
            }

            router.push('/login');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-vibrant-mesh flex items-center justify-center p-4">
            <div className="glass-card w-full max-w-md p-8 rounded-2xl shadow-xl animate-in fade-in zoom-in-95 duration-500">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Create Account</h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Already have an account? <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline">Sign in</Link>
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <Input
                            id="full_name"
                            type="text"
                            label="Full Name"
                            required
                            value={formData.full_name}
                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                            className="bg-white/50"
                        />
                        <Input
                            id="email"
                            type="email"
                            label="Email address"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="bg-white/50"
                        />
                        <Input
                            id="password"
                            type="password"
                            label="Password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="bg-white/50"
                        />

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">I am a...</label>
                            <div className="relative">
                                <select
                                    className="flex h-11 w-full rounded-lg border border-slate-200 bg-white/50 px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 appearance-none transition-all"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                >
                                    <option value="student">Student / Candidate</option>
                                    <option value="hr">HR / Recruiter</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 opacity-50 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded border border-red-100">
                            {error}
                        </div>
                    )}

                    <Button type="submit" variant="gradient" className="w-full h-12 text-base shadow-lg shadow-indigo-500/20" isLoading={isLoading}>
                        Start My Journey
                    </Button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-200/50 text-center">
                    <p className="text-xs text-slate-500">
                        By signing up, you agree to our <span className="underline cursor-pointer">Terms</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
                    </p>
                </div>
            </div>
        </div>
    );
}
