"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

type Step = "gender" | "goal" | "focus" | "processing";

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState<Step>("gender");
    const [direction, setDirection] = useState(1);
    const [formData, setFormData] = useState({
        gender: "",
        goal: "",
        focus: [] as string[],
    });

    const nextStep = (next: Step) => {
        setDirection(1);
        setStep(next);
    };

    const finish = () => {
        setDirection(1);
        setStep("processing");
        setTimeout(() => {
            router.push("/subscription"); // Go to paywall before dashboard
        }, 3000);
    };

    const variants = {
        enter: (dir: number) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? -50 : 50, opacity: 0 }),
    };

    return (
        <div className="flex min-h-screen flex-col bg-background p-6">
            <header className="mb-8 flex items-center">
                {step !== "gender" && step !== "processing" && (
                    <button
                        onClick={() => {
                            setDirection(-1);
                            // Simple back logic
                            if (step === 'goal') setStep('gender');
                            if (step === 'focus') setStep('goal');
                        }}
                        className="rounded-full bg-secondary p-2"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                )}
                <div className="flex-1 text-center pr-9">
                    <div className="h-2 w-full max-w-[100px] bg-secondary rounded-full mx-auto overflow-hidden">
                        <motion.div
                            className="h-full bg-primary"
                            initial={{ width: "0%" }}
                            animate={{
                                width: step === "gender" ? "25%" : step === "goal" ? "50%" : step === "focus" ? "75%" : "100%"
                            }}
                        />
                    </div>
                </div>
            </header>

            <div className="flex flex-1 flex-col justify-center max-w-lg mx-auto w-full relative overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>

                    {/* STEP 1: GENDER */}
                    {step === "gender" && (
                        <motion.div
                            key="gender"
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="flex flex-col gap-6"
                        >
                            <h2 className="text-3xl font-bold text-center">¿Cuál es tu género?</h2>
                            <p className="text-center text-muted-foreground -mt-4">Para calibrar las calorías.</p>

                            <div className="grid gap-4">
                                {['Hombre', 'Mujer', 'Otro'].map((g) => (
                                    <button
                                        key={g}
                                        onClick={() => {
                                            setFormData({ ...formData, gender: g });
                                            nextStep("goal");
                                        }}
                                        className="flex items-center justify-between p-6 rounded-2xl bg-secondary hover:bg-primary/20 hover:border-primary border-2 border-transparent transition-all"
                                    >
                                        <span className="text-lg font-semibold">{g}</span>
                                        <ArrowRight className="h-5 w-5 opacity-50" />
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: GOAL */}
                    {step === "goal" && (
                        <motion.div
                            key="goal"
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="flex flex-col gap-6"
                        >
                            <h2 className="text-3xl font-bold text-center">¿Cuál es tu objetivo?</h2>

                            <div className="grid gap-4">
                                {[
                                    { id: 'lose', label: 'Perder Peso', icon: '🔥' },
                                    { id: 'muscle', label: 'Ganar Músculo', icon: '💪' },
                                    { id: 'keep', label: 'Mantenerme', icon: '🧘' }
                                ].map((g) => (
                                    <button
                                        key={g.id}
                                        onClick={() => {
                                            setFormData({ ...formData, goal: g.id });
                                            nextStep("focus");
                                        }}
                                        className="flex items-center gap-4 p-5 rounded-2xl bg-secondary hover:bg-primary/20 border-2 border-transparent transition-all text-left"
                                    >
                                        <span className="text-3xl">{g.icon}</span>
                                        <div className="flex-1">
                                            <span className="text-lg font-semibold block">{g.label}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: FOCUS AREAS */}
                    {step === "focus" && (
                        <motion.div
                            key="focus"
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="flex flex-col gap-6 h-full"
                        >
                            <h2 className="text-3xl font-bold text-center">Zonas a trabajar</h2>
                            <p className="text-center text-muted-foreground -mt-4">Selecciona todas las que apliquen.</p>

                            <div className="grid grid-cols-2 gap-4">
                                {['Abdomen', 'Brazos', 'Piernas', 'Glúteos', 'Espalda', 'Pecho'].map((item) => {
                                    const isSelected = formData.focus.includes(item);
                                    return (
                                        <button
                                            key={item}
                                            onClick={() => {
                                                const newFocus = isSelected
                                                    ? formData.focus.filter(i => i !== item)
                                                    : [...formData.focus, item];
                                                setFormData({ ...formData, focus: newFocus });
                                            }}
                                            className={clsx(
                                                "p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2",
                                                isSelected
                                                    ? "bg-primary border-primary text-primary-foreground"
                                                    : "bg-secondary border-transparent"
                                            )}
                                        >
                                            <span className={clsx("h-6 w-6 rounded-full border flex items-center justify-center", isSelected ? "border-white bg-white/20" : "border-gray-400")}>
                                                {isSelected && <Check className="h-4 w-4" />}
                                            </span>
                                            <span className="font-semibold">{item}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                onClick={finish}
                                className="mt-auto mb-4 w-full bg-primary text-primary-foreground font-bold py-4 rounded-full text-lg shadow-lg"
                            >
                                Continuar
                            </button>
                        </motion.div>
                    )}

                    {/* STEP 4: PROCESSING */}
                    {step === "processing" && (
                        <motion.div
                            key="processing"
                            variants={variants}
                            initial="enter"
                            animate="center"
                            className="flex flex-1 flex-col items-center justify-center gap-6 text-center"
                        >
                            <div className="relative h-24 w-24">
                                <svg className="animate-spin h-full w-full text-primary" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold animate-pulse">Creando tu plan perfecto...</h2>
                            <p className="text-muted-foreground">Analizando tu biotipo y objetivos.</p>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
