import Link from "next/link";
import { ArrowRight, Trophy, Activity, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background pb-10">
      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center pt-20">
        <div className="mb-6 rounded-2xl bg-primary/10 p-3">
          <Trophy className="h-8 w-8 text-primary" />
        </div>

        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Transforma tu cuerpo<br />
          <span className="text-primary">en 30 días</span>
        </h1>

        <p className="mb-8 max-w-md text-lg text-muted-foreground opacity-80">
          Entrenamientos personalizados, sin gimnasio y adaptados a tu ritmo de vida.
        </p>

        <Link
          href="/onboarding"
          className="group relative flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20"
        >
          Crear mi Plan
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </main>

      {/* Features Grid */}
      <section className="px-6 grid grid-cols-2 gap-4 max-w-lg mx-auto w-full">
        <div className="rounded-2xl bg-secondary p-5 flex flex-col items-center text-center gap-2">
          <Zap className="h-6 w-6 text-orange-500" />
          <span className="font-bold text-sm">Rápido</span>
          <span className="text-xs text-muted-foreground opacity-70">15 min/día</span>
        </div>
        <div className="rounded-2xl bg-secondary p-5 flex flex-col items-center text-center gap-2">
          <Activity className="h-6 w-6 text-blue-500" />
          <span className="font-bold text-sm">A medida</span>
          <span className="text-xs text-muted-foreground opacity-70">Tu nivel</span>
        </div>
      </section>
    </div>
  );
}
