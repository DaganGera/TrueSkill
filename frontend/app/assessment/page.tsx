'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { AccessibilityToggle } from "@/components/ui/AccessibilityToggle";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { Volume2, ChevronRight, ChevronLeft, Flag, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { WebcamView } from '@/components/WebcamView';
import { AlertCircle, Clock, CheckCircle2, Video, Hand } from 'lucide-react';
import { getApiUrl } from '@/utils/api';

// Simple KNN/Distance types
type Landmark = { x: number, y: number, z: number };
type GestureSample = { name: string, landmarks: Landmark[] };

interface Question {
    id: number;
    text: string;
    skill_category: string;
    question_type: string;
    difficulty: string;
}

interface Answer {
    question_id: number;
    text: string;
}

export default function Assessment() {
    const router = useRouter();
    const { user } = useAuth();

    // Assessment State
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [assessmentId, setAssessmentId] = useState<string>("");

    // Derived state
    const currentQuestion = questions[currentStep - 1];
    const totalSteps = questions.length || 1;
    const progress = (currentStep / totalSteps) * 100;

    // Timer state
    const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes in seconds

    // ISL / Camera State
    const [showCamera, setShowCamera] = useState(false);
    const [gestureSamples, setGestureSamples] = useState<GestureSample[]>([]);
    const [lastDetectedGesture, setLastDetectedGesture] = useState<string>("");
    const [calibrationMode, setCalibrationMode] = useState<string | null>(null); // "Next" or "Submit"
    const [lastActionTime, setLastActionTime] = useState(0);

    // Haptic Feedback
    const triggerHapticFeedback = (pattern: number[]) => {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    };

    // Timer Logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Text-to-Speech
    const speakQuestion = () => {
        if ('speechSynthesis' in window && currentQuestion) {
            const utterance = new SpeechSynthesisUtterance(currentQuestion.text);
            window.speechSynthesis.speak(utterance);
        }
    };

    const fetchQuestions = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');


            const apiUrl = getApiUrl();
            const res = await fetch(`${apiUrl}/assessment/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    domain: user?.domain || 'General',
                    level: user?.experience && user.experience > 5 ? 'Senior' : 'Intermediate',
                    experience: user?.experience || 0,
                    skills: user?.skills || []
                })
            });

            if (!res.ok) throw new Error('Failed to fetch questions');

            const data = await res.json();
            setQuestions(data.questions);
            setAssessmentId(data.id);
            // Initialize empty answers
            setAnswers(data.questions.map((q: Question) => ({ question_id: q.id, text: "" })));

            // Haptic feedback for load
            triggerHapticFeedback([100, 50, 100]);

        } catch (error) {
            console.error("Error fetching assessment:", error);
            // Fallback for demo if API fails/offline
            setQuestions([
                { id: 1, text: "Fallback: Describe a difficult technical challenge you solved.", skill_category: "Problem Solving", question_type: "text", difficulty: "Intermediate" }
            ]);
            setAnswers([{ question_id: 1, text: "" }]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Fetch questions when user is available
        if (user) {
            fetchQuestions();
        }
    }, [user]);

    // ISL Logic
    const calculateDistance = useCallback((landmarks1: Landmark[], landmarks2: Landmark[]) => {
        let totalDist = 0;
        for (let i = 0; i < landmarks1.length; i++) {
            const dx = landmarks1[i].x - landmarks2[i].x;
            const dy = landmarks1[i].y - landmarks2[i].y;
            const dz = landmarks1[i].z - landmarks2[i].z;
            totalDist += Math.sqrt(dx * dx + dy * dy + dz * dz);
        }
        return totalDist / landmarks1.length; // Average distance per point
    }, []);

    // ISL Logic - Wrapped in useCallback to prevent re-renders in WebcamView
    const handleLandmarksDetected = useCallback((landmarks: any[]) => {
        if (!landmarks || landmarks.length === 0) return;

        const currentLandmarks = landmarks[0]; // First hand

        // 1. Calibration
        if (calibrationMode) {
            setGestureSamples(prev => {
                if (prev.find(g => g.name === calibrationMode)) return prev;
                return [...prev, { name: calibrationMode, landmarks: currentLandmarks }];
            });
            setCalibrationMode(null); // One-shot calibration
            alert(`Gestures for '${calibrationMode}' saved!`);
            return;
        }

        // 2. Inference (Simple Euclidean Distance)
        let minDistance = Infinity;
        let matchedGesture = "";

        for (const sample of gestureSamples) {
            const dist = calculateDistance(currentLandmarks, sample.landmarks);
            if (dist < minDistance) {
                minDistance = dist;
                matchedGesture = sample.name;
            }
        }

        // Threshold (tuned for simplicity)
        if (minDistance < 0.4) {
            setLastDetectedGesture(matchedGesture);

            // Debounce actions (2 seconds)
            const now = Date.now();
            if (now - lastActionTime > 2000) {
                if (matchedGesture === "Next") {
                    // Use functional update to avoid stale closure or need for dependency
                    setCurrentStep(prev => prev < totalSteps ? prev + 1 : prev);
                    setLastActionTime(now);
                } else if (matchedGesture === "Submit") {
                    // Trigger submit (maybe require double confirmation in real app)
                    // handleSubmit(); // Too dangerous for auto-trigger in demo without confirming
                }
            }
        } else {
            setLastDetectedGesture("");
        }
    }, [calibrationMode, gestureSamples, calculateDistance, lastActionTime, totalSteps]);

    const handleAnswerChange = (text: string) => {
        const newAnswers = [...answers];
        const index = currentStep - 1;
        if (newAnswers[index]) {
            newAnswers[index].text = text;
            setAnswers(newAnswers);
        }
    };

    const submitAssessment = async () => {
        setIsSubmitting(true);
        triggerHapticFeedback([200, 100, 200]); // Longer vibration for submit start
        try {
            const token = localStorage.getItem('token');
            try {
                const apiUrl = getApiUrl();
                const res = await fetch(`${apiUrl}/assessment/submit`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        assessment_id: assessmentId,
                        answers: answers
                    })
                });

                if (!res.ok) throw new Error('Failed to submit');

                const result = await res.json();

                // Save result to localStorage to display on Report page
                localStorage.setItem('assessmentResult', JSON.stringify(result));
                router.push('/report');

            } catch (error) {
                console.error("Submission failed:", error);
                alert("Failed to submit assessment. Please try again.");
                setIsSubmitting(false);
            }
        };

        const formatTime = (seconds: number) => {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        };

        if (!user) return <div className="p-10 text-center">Loading User Profile...</div>;

        return (
            <div className="min-h-screen bg-vibrant-mesh flex flex-col items-center py-10 px-6 relative transition-colors duration-500">
                <AccessibilityToggle />

                <header className="w-full max-w-6xl mb-8 flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-500 glass-card rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-emerald-500/50 shadow-sm"></span>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Live Assessment: {user.domain}</span>
                    </div>
                    <Badge variant={timeLeft < 300 ? "error" : "neutral"} className="font-mono text-lg">
                        {formatTime(timeLeft)}
                    </Badge>
                </header>

                <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">

                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between text-sm font-medium text-slate-600">
                                <span>Question {currentStep} of {totalSteps}</span>
                                <span>{Math.round(progress)}% Completed</span>
                            </div>
                            <ProgressBar value={progress} className="h-2" />
                        </div>

                        <Card noPadding className="overflow-hidden shadow-2xl border-indigo-100/50 ring-1 ring-slate-100/50 backdrop-blur-sm bg-white/90">
                            {isLoading || !currentQuestion ? (
                                <div className="p-8 space-y-6">
                                    <Skeleton className="h-8 w-3/4 rounded-md" />
                                    <Skeleton className="h-4 w-full rounded-md" />
                                    <Skeleton className="h-32 w-full rounded-md mt-6" />
                                </div>
                            ) : (
                                <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-300">
                                    {/* Question Header */}
                                    <div className="p-8 border-b border-slate-100 bg-slate-50/80 flex justify-between items-start">
                                        <div className="space-y-4 max-w-2xl">
                                            <Badge variant="default" className="text-xs">{currentQuestion.skill_category}</Badge>
                                            <h2 className="text-xl font-semibold text-slate-900 leading-snug">
                                                {currentQuestion.text}
                                            </h2>
                                        </div>
                                        <Button variant="ghost" size="icon" title="Read Aloud" onClick={speakQuestion} className="text-slate-400 hover:text-indigo-600">
                                            <Volume2 className="w-5 h-5" />
                                        </Button>
                                    </div>

                                    {/* Answer Area */}
                                    <div className="p-8 bg-white/50">
                                        <textarea
                                            className="w-full min-h-[240px] p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-base resize-none font-sans leading-relaxed transition-all placeholder:text-slate-300 shadow-inner"
                                            placeholder="Type your answer here..."
                                            value={answers[currentStep - 1]?.text || ""}
                                            onChange={(e) => handleAnswerChange(e.target.value)}
                                            spellCheck={false}
                                        />
                                    </div>

                                    {/* Footer Actions */}
                                    <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
                                        <Button
                                            variant="ghost"
                                            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                                            disabled={currentStep === 1 || isSubmitting}
                                            className="text-slate-500 hover:bg-slate-100"
                                        >
                                            <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                                        </Button>

                                        <div className="flex gap-3">
                                            <Button variant="outline" className="text-slate-500 hover:text-amber-600 border-slate-200">
                                                <Flag className="w-4 h-4 mr-2" /> Flag
                                            </Button>

                                            {currentStep === totalSteps ? (
                                                <Button
                                                    onClick={submitAssessment}
                                                    disabled={isSubmitting}
                                                    className="px-8 shadow-lg shadow-indigo-500/20 bg-indigo-600 hover:bg-indigo-700 text-white"
                                                >
                                                    {isSubmitting ? 'Submitting...' : 'Finish Assessment'}
                                                    {!isSubmitting && <CheckCircle className="w-4 h-4 ml-2" />}
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
                                                    className="px-8 shadow-md shadow-indigo-500/20"
                                                >
                                                    Next Question <ChevronRight className="w-4 h-4 ml-2" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Card>
                    </div>

                    {/* Sidebar with Stats & Camera */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="p-6 border-0 shadow-lg bg-white/80 backdrop-blur-md">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Time Remaining</p>
                                    <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                                        {formatTime(timeLeft)}
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* ISL Camera Panel */}
                        <Card className="p-4 border-0 shadow-lg bg-white/80 backdrop-blur-md overflow-hidden">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-2">
                                    <Video className="w-5 h-5 text-indigo-600" />
                                    <h3 className="font-semibold text-slate-800">ISL Control</h3>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setShowCamera(!showCamera)}
                                >
                                    {showCamera ? "Hide" : "Show"}
                                </Button>
                            </div>

                            {showCamera && (
                                <div className="space-y-4">
                                    <WebcamView onLandmarksDetected={handleLandmarksDetected} />

                                    <div className="space-y-2">
                                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Calibration</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Button
                                                size="sm"
                                                variant={gestureSamples.find(g => g.name === "Next") ? "secondary" : "outline"}
                                                onClick={() => setCalibrationMode("Next")}
                                                className="text-xs"
                                            >
                                                <Hand className="w-3 h-3 mr-1" />
                                                Record "Next"
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant={gestureSamples.find(g => g.name === "Submit") ? "secondary" : "outline"}
                                                onClick={() => setCalibrationMode("Submit")}
                                                className="text-xs"
                                            >
                                                <Hand className="w-3 h-3 mr-1" />
                                                Record "Submit"
                                            </Button>
                                        </div>
                                        {calibrationMode && (
                                            <div className="p-2 bg-yellow-50 text-yellow-700 text-xs rounded border border-yellow-200 animate-pulse">
                                                Make the gesture for <strong>{calibrationMode}</strong> to save it.
                                            </div>
                                        )}
                                    </div>

                                    {lastDetectedGesture && (
                                        <div className="p-3 bg-green-100 text-green-700 text-center rounded-lg font-bold animate-in fade-in slide-in-from-bottom-2">
                                            Detected: {lastDetectedGesture}
                                        </div>
                                    )}
                                </div>
                            )}
                        </Card>
                    </div>
                </main>
            </div>
        );
    }
}
