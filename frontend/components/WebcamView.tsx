'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";

// Note: MediaPipe integration will be added here.
// For now, we set up the basic video feed and canvas.

interface WebcamViewProps {
    onLandmarksDetected?: (landmarks: any) => void;
}

export function WebcamView({ onLandmarksDetected }: WebcamViewProps) {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isEnabled, setIsEnabled] = useState(false);
    const [handLandmarker, setHandLandmarker] = useState<HandLandmarker | null>(null);

    // Initialize MediaPipe
    useEffect(() => {
        const loadModel = async () => {
            const vision = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
            );
            const landmarker = await HandLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
                    delegate: "GPU"
                },
                runningMode: "VIDEO",
                numHands: 2
            });
            setHandLandmarker(landmarker);
        };
        loadModel();
    }, []);

    // Process Video Frame
    const processVideo = useCallback(() => {
        if (
            webcamRef.current &&
            webcamRef.current.video &&
            webcamRef.current.video.readyState === 4 &&
            handLandmarker
        ) {
            const video = webcamRef.current.video;
            const startTimeMs = performance.now();
            const result = handLandmarker.detectForVideo(video, startTimeMs);

            if (result.landmarks && result.landmarks.length > 0) {
                // Determine if hands are visible
                if (onLandmarksDetected) {
                    onLandmarksDetected(result.landmarks);
                }

                // Draw on canvas
                const canvas = canvasRef.current;
                if (canvas) {
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        ctx.clearRect(0, 0, canvas.width, canvas.height);

                        // Simple drawing for feedback
                        for (const landmarks of result.landmarks) {
                            drawConnectors(ctx, landmarks, HAND_CONNECTIONS, { color: "#00FF00", lineWidth: 2 });
                            drawLandmarks(ctx, landmarks, { color: "#FF0000", lineWidth: 1, radius: 3 });
                        }
                    }
                }
            }
        }
        requestAnimationFrame(processVideo);
    }, [handLandmarker, onLandmarksDetected]);

    useEffect(() => {
        let animationId: number;
        if (isEnabled && handLandmarker) {
            animationId = requestAnimationFrame(processVideo);
        }
        return () => cancelAnimationFrame(animationId);
    }, [isEnabled, handLandmarker, processVideo]);

    return (
        <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-black shadow-inner">
            {!isEnabled ? (
                <div className="flex flex-col items-center justify-center h-64 bg-slate-900 text-slate-400">
                    <p className="mb-4">Camera is disabled</p>
                    <button
                        onClick={() => setIsEnabled(true)}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
                    >
                        Enable Data Collection Camera
                    </button>
                </div>
            ) : (
                <>
                    <Webcam
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        className="w-full h-auto"
                        videoConstraints={{
                            width: 640,
                            height: 480,
                            facingMode: "user"
                        }}
                    />
                    <canvas
                        ref={canvasRef}
                        className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    />
                    <button
                        onClick={() => setIsEnabled(false)}
                        className="absolute bottom-2 right-2 px-2 py-1 bg-red-500/80 hover:bg-red-600 text-white text-xs rounded"
                    >
                        Disable
                    </button>
                </>
            )}
        </div>
    );
}

// Simple drawing helpers to avoid full drawing_utils dependency if possible, or we can install it.
// For now, let's keep it simple or remove drawing to save time if import fails.
// Actually, let's use a simplified draw function to avoid another package install if not needed.
const HAND_CONNECTIONS = [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12], [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [0, 17], [17, 18], [18, 19], [19, 20]];

function drawConnectors(ctx: CanvasRenderingContext2D, landmarks: any[], connections: any[], style: any) {
    ctx.strokeStyle = style.color;
    ctx.lineWidth = style.lineWidth;
    for (const connection of connections) {
        const start = landmarks[connection[0]];
        const end = landmarks[connection[1]];
        ctx.beginPath();
        ctx.moveTo(start.x * ctx.canvas.width, start.y * ctx.canvas.height);
        ctx.lineTo(end.x * ctx.canvas.width, end.y * ctx.canvas.height);
        ctx.stroke();
    }
}

function drawLandmarks(ctx: CanvasRenderingContext2D, landmarks: any[], style: any) {
    ctx.fillStyle = style.color;
    for (const landmark of landmarks) {
        ctx.beginPath();
        ctx.arc(landmark.x * ctx.canvas.width, landmark.y * ctx.canvas.height, style.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}
