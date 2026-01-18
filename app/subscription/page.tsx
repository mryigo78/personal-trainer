"use client";

import { Check, Star, X } from "lucide-react";
import Link from "next/link";

export default function SubscriptionPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <div className="relative h-64 bg-zinc-900 text-white flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20" />
                <h1 className="z-10 text-3xl font-extrabold mb-2">Plan Listo</h1>
                <p className="z-10 text-zinc-300">Tu transformación comienza ahora.</p>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
            </div>

            <div className="flex-1 -mt-8 px-6 pb-8 z-20">
                <div className="bg-card rounded-3xl shadow-xl p-6 border border-border">
                    <h2 className="text-xl font-bold text-center mb-6">Elige tu compromiso</h2>

                    <div className="space-y-4">
                        {/* Monthly Plan */}
                        <div className="relative rounded-2xl border-2 border-primary bg-primary/5 p-4 flex items-center justify-between cursor-pointer">
                            <div className="absolute -top-3 right-4 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                                RECOMENDADO
                            </div>
                            <div>
                                <p className="font-bold text-lg">Mensual</p>
                                <p className="text-sm text-muted-foreground">Facturado cada mes</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-2xl">$9.99</p>
                                <p className="text-xs text-muted-foreground">/mes</p>
                            </div>
                        </div>

                        {/* Annual Plan */}
                        <div className="rounded-2xl border border-border p-4 flex items-center justify-between opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
                            <div>
                                <p className="font-bold text-lg">Anual</p>
                                <p className="text-sm text-muted-foreground">Ahorra 50%</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-2xl">$59.99</p>
                                <p className="text-xs text-muted-foreground">/año</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 space-y-4">
                        <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">Premium incluye:</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3">
                                <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><Check size={14} /></div>
                                <span className="text-sm font-medium">Plan de entrenamiento personalizado</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><Check size={14} /></div>
                                <span className="text-sm font-medium">Guías en video HD</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><Check size={14} /></div>
                                <span className="text-sm font-medium">Sin anuncios</span>
                            </li>
                        </ul>
                    </div>

                    <Link href="/dashboard" className="mt-8 block w-full bg-primary text-primary-foreground font-extrabold text-center py-4 rounded-full text-lg shadow-lg hover:brightness-110 active:scale-95 transition-all">
                        Empezar Ahora
                    </Link>

                    <p className="mt-4 text-center text-xs text-muted-foreground">
                        Suscripción auto-renovable. Cancela cuando quieras.
                    </p>
                </div>
            </div>
        </div>
    );
}
