"use client";

import { use, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Pause, Play, SkipForward, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function WorkoutPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [isPlaying, setIsPlaying] = useState(true);
    const [timeLeft, setTimeLeft] = useState(45); // Seconds

    // Simulate exercise data based on ID
    const exerciseName = id === '1' ? 'Warmup Jump' : id === '2' ? 'Squats' : 'Exercise';

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            // Finished
            setIsPlaying(false);
        }
        return () => clearInterval(interval);
    }, [isPlaying, timeLeft]);

    return (
        <div className="flex h-screen flex-col bg-black text-white">
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
                <Link href="/dashboard" className="rounded-full bg-white/20 p-2 backdrop-blur-md">
                    <ChevronLeft className="h-6 w-6" />
                </Link>
                <span className="font-bold tracking-widest uppercase text-sm opacity-80">Round 1</span>
                <div className="w-10"></div>
            </div>

            {/* Video Area (Stickman Animation) */}
            <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-zinc-900">
                <div className="relative z-0">
                    {/* Stickman Squat Animation */}
                    <svg width="200" height="300" viewBox="0 0 100 200" className="stroke-primary stroke-[4] fill-none stroke-linecap-round stroke-linejoin-round">
                        <motion.g
                            animate={{
                                y: isPlaying ? [0, 40, 0] : 0
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            {/* Head */}
                            <circle cx="50" cy="30" r="12" />
                            {/* Body */}
                            <path d="M50 42 L50 90" />
                            {/* Arms */}
                            <path d="M20 70 L50 50 L80 70" />
                        </motion.g>

                        {/* Legs (Animated separately for squat effect) */}
                        <motion.path
                            d="M50 90 L20 150 L20 190" // Left Leg
                            animate={{
                                d: isPlaying ?
                                    "M50 130 L10 160 L10 190" : // Squat down
                                    "M50 90 L20 150 L20 190"    // Stand up
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.path
                            d="M50 90 L80 150 L80 190" // Right Leg
                            animate={{
                                d: isPlaying ?
                                    "M50 130 L90 160 L90 190" : // Squat down
                                    "M50 90 L80 150 L80 190"    // Stand up
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </svg>
                </div>

                <div className="absolute bottom-12 w-full text-center px-4 z-10">
                    <h1 className="text-3xl font-black mb-2">{exerciseName}</h1>
                    <p className="text-white/70">Mantén la espalda recta y respira.</p>
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="bg-zinc-900 rounded-t-3xl p-8 pb-10 flex flex-col items-center">

                {/* Timer */}
                <div className="text-6xl font-black font-mono mb-8 tracking-tighter">
                    0:{timeLeft.toString().padStart(2, '0')}
                </div>

                <div className="flex items-center gap-8">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="h-20 w-20 rounded-full bg-primary text-black flex items-center justify-center hover:scale-105 transition-transform"
                    >
                        {isPlaying ? <Pause fill="currentColor" size={32} /> : <Play fill="currentColor" size={32} className="ml-1" />}
                    </button>

                    <button
                        onClick={() => router.push('/dashboard')}
                        className="h-14 w-14 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                    >
                        <SkipForward size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
}
