'use client';
// components/About.tsx
import { useEffect, useRef } from 'react';
import { Heart, Award, Users, Sprout } from 'lucide-react';

const stats = [
  { icon: <Users className="w-5 h-5" />, value: '200+', label: 'Familias satisfechas' },
  { icon: <Award className="w-5 h-5" />, value: '3 años', label: 'De trayectoria' },
  { icon: <Sprout className="w-5 h-5" />, value: '15+', label: 'Productores locales' },
  { icon: <Heart className="w-5 h-5" />, value: '100%', label: 'Con amor del Caribe' },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="nosotros" className="py-24 px-4 sm:px-6 lg:px-8 bg-campo-oscuro" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* ─── Left: Text ─── */}
          <div className="reveal">
            <div className="inline-flex items-center gap-2 text-campo-tierra text-xs font-bold tracking-widest uppercase mb-4">
              <Heart className="w-3.5 h-3.5" />
              Nuestra Historia
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-campo-crema mb-6 leading-tight">
              Del corazón del Caribe
              <span className="text-campo-tierra"> a tu mesa.</span>
            </h2>
            <p className="text-campo-crema/65 text-base leading-relaxed mb-5">
              Somos un puente entre los productores artesanales del Caribe colombiano y las
              familias de Barranquilla que buscan alimentarse con productos genuinos, frescos
              y llenos de sabor auténtico.
            </p>
            <p className="text-campo-crema/65 text-base leading-relaxed mb-8">
              Cada queso costeño, cada arepa de maíz, cada suero atollabuey que llega a tu
              puerta fue elaborado con técnicas ancestrales y el cariño de familias
              productoras que llevan generaciones perfeccionando su arte.
            </p>
            <a
              href="#productos"
              className="inline-flex items-center gap-2 bg-campo-tierra text-white px-7 py-3.5 rounded-2xl font-bold text-sm hover:bg-campo-tierra-light transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Sprout className="w-4 h-4" />
              Ver nuestro catálogo
            </a>
          </div>

          {/* ─── Right: Stats grid ─── */}
          <div className="grid grid-cols-2 gap-4 reveal" style={{ transitionDelay: '150ms' }}>
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="bg-white/5 border border-white/8 rounded-4xl p-6 hover:bg-white/10 hover:border-campo-tierra/30 transition-all duration-300"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-10 h-10 bg-campo-tierra/20 rounded-2xl flex items-center justify-center text-campo-tierra mb-4">
                  {s.icon}
                </div>
                <p className="font-serif text-3xl font-bold text-campo-crema mb-1">{s.value}</p>
                <p className="text-campo-crema/50 text-sm">{s.label}</p>
              </div>
            ))}

            {/* Featured quote */}
            <div className="col-span-2 bg-campo-tierra/15 border border-campo-tierra/30 rounded-4xl p-6">
              <p className="text-campo-crema/80 text-sm italic leading-relaxed">
                "Cada mañana despertamos con el propósito de llevar lo mejor del campo
                a cada familia barranquillera. Eso nos mueve."
              </p>
              <p className="text-campo-tierra font-semibold text-sm mt-3">— El equipo de Del Campo a Tu Mesa</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
