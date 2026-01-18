"use client";

import { Play, Calendar, Zap, Clock } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    const todayExercises = [
        { id: 1, name: "Calentamiento Dinámico", duration: "5 min", type: "Warmup" },
        { id: 2, name: "Sentadillas", duration: "3 sets x 12", type: "Strength" },
        { id: 3, name: "Flexiones", duration: "3 sets x 10", type: "Strength" },
        { id: 4, name: "Estiramiento", duration: "5 min", type: "Cooldown" },
    ];

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-border/50">
                <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Día 1</p>
                    <h1 className="text-2xl font-bold">Hoy</h1>
                </div>
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center font-bold text-primary">
                    JD
                </div>
            </header>

            {/* Main Stats */}
            <div className="px-6 mt-6">
                <div className="bg-primary/10 rounded-3xl p-6 flex items-center justify-between">
                    <div>
                        <span className="block text-sm font-medium text-muted-foreground mb-1">Tu Objetivo</span>
                        <span className="text-2xl font-black text-primary">75%</span>
                        <div className="h-2 w-24 bg-background rounded-full mt-2 overflow-hidden">
                            <div className="h-full bg-primary w-3/4"></div>
                        </div>
                    </div>
                    <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <Zap className="text-orange-500 fill-orange-500" />
                    </div>
                </div>
            </div>

            {/* Workout List */}
            <div className="px-6 mt-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold">Rutina de hoy</h2>
                    <span className="text-sm text-primary font-medium flex items-center gap-1">
                        <Clock size={14} /> 25 min
                    </span>
                </div>

                <div className="space-y-4">
                    {todayExercises.map((ex, i) => (
                        <Link href={`/workout/${ex.id}`} key={ex.id}>
                            <div className="group flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all active:scale-95">
                                <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    {i + 1}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold">{ex.name}</h3>
                                    <p className="text-xs text-muted-foreground">{ex.duration} • {ex.type}</p>
                                </div>
                                <div className="h-8 w-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:text-primary">
                                    <Play size={14} className="ml-0.5" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Floating Action Button */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
                <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold shadow-xl shadow-primary/30 flex items-center gap-2 hover:scale-105 transition-transform">
                    <Play fill="currentColor" size={18} /> Iniciar Rutina
                </button>
            </div>
        </div>
    );
}
