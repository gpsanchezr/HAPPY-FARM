'use client';
// components/Hero.tsx
import { useEffect, useRef } from 'react';
import { ArrowDown, Truck, Shield, Leaf } from 'lucide-react';

export default function Hero() {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const els = [h1Ref.current, pRef.current].filter(Boolean);
    els.forEach((el, i) => {
      if (!el) return;
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 200 + i * 150);
    });
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(135deg, #2C3E1F 0%, #3D5229 40%, #4A5D3B 70%, #5B7048 100%)',
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='1.5' fill='%23FDFBF6' opacity='0.4'/%3E%3Ccircle cx='0' cy='0' r='1' fill='%23FDFBF6' opacity='0.25'/%3E%3Ccircle cx='60' cy='60' r='1' fill='%23FDFBF6' opacity='0.25'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-1/2 rounded-full bg-campo-tierra/15 blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-campo-verde-light/20 blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-8 max-w-4xl mx-auto pt-24 pb-12">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-campo-crema text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8 border border-white/20">
          <Leaf className="w-3 h-3 text-green-400" />
          Barranquilla · Caribe Colombiano
        </div>

        <h1
          ref={h1Ref}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-campo-crema leading-[1.05] mb-6"
          style={{
            opacity: 0,
            transform: 'translateY(40px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }}
        >
          Sabor Auténtico
          <br />
          <span className="text-campo-tierra">del Caribe.</span>
        </h1>

        <p
          ref={pRef}
          className="font-sans text-lg sm:text-xl text-campo-crema/80 max-w-xl mx-auto mb-10 font-light leading-relaxed"
          style={{
            opacity: 0,
            transform: 'translateY(30px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }}
        >
          Directo de nuestros productores a tu mesa. Productos frescos y artesanales
          con el corazón puesto en cada entrega.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#productos"
            className="inline-flex items-center gap-2 bg-campo-tierra text-white px-8 py-4 rounded-2xl font-bold text-base hover:bg-campo-tierra-light transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
          >
            Ver Catálogo
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
          <a
            href="#nosotros"
            className="inline-flex items-center gap-2 border-2 border-white/30 text-campo-crema px-8 py-4 rounded-2xl font-semibold text-base hover:bg-white/10 transition-all duration-300"
          >
            Conoce nuestra historia
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {[
            { icon: <Truck className="w-4 h-4" />, text: 'Entrega a domicilio' },
            { icon: <Shield className="w-4 h-4" />, text: 'Calidad garantizada' },
            { icon: <Leaf className="w-4 h-4" />, text: '100% artesanal' },
          ].map((b) => (
            <div
              key={b.text}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 text-campo-crema/90 text-sm font-medium px-4 py-2 rounded-full"
            >
              <span className="text-green-400">{b.icon}</span>
              {b.text}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40 Q360 0 720 40 Q1080 80 1440 40 L1440 80 L0 80 Z" fill="#FDFBF6" />
        </svg>
      </div>
    </section>
  );
}
