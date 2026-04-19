<<<<<<< HEAD
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
      {/* ─── Background ─── */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(135deg, #2C3E1F 0%, #3D5229 40%, #4A5D3B 70%, #5B7048 100%)',
        }}
      >
        {/* Texture overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='1.5' fill='%23FDFBF6' opacity='0.4'/%3E%3Ccircle cx='0' cy='0' r='1' fill='%23FDFBF6' opacity='0.25'/%3E%3Ccircle cx='60' cy='60' r='1' fill='%23FDFBF6' opacity='0.25'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Warm glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-1/2 rounded-full bg-campo-tierra/15 blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-campo-verde-light/20 blur-3xl" />
      </div>

      {/* ─── Content ─── */}
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

        {/* ─── Feature badges ─── */}
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

      {/* ─── Bottom wave ─── */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40 Q360 0 720 40 Q1080 80 1440 40 L1440 80 L0 80 Z" fill="#FDFBF6" />
        </svg>
=======
import Image from "next/image";

export default function Hero() {
  return (
    <section id="inicio" className="relative h-[600px] flex items-center justify-center bg-gray-100 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/campo.jpg"
          alt="Campo"
          fill
          className="object-cover"
          priority
        />
        {/* Fallback gradient if image fails */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700 to-primary-500" />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10"></div>

      {/* Content */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full h-full flex items-center">
        {/* Left Side - Text */}
        <div className="flex-1">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4">
            Nación Campo Verde
          </h1>
          <p className="text-2xl sm:text-3xl text-white/95 mb-8 italic font-light">
            Fuerza rural, corazón ecológico.
          </p>
          <a
            href="#destacados"
            className="inline-block bg-white text-primary-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Ver Productos
          </a>
        </div>
      </div>

      {/* Right Side - Logo (outside content container to extend to edge) */}
      <div className="absolute right-0 top-0 bottom-0 w-1/5 flex items-center justify-center z-15">
        <div className="relative w-96 h-96 sm:w-[500px] sm:h-[500px] border-8 border-primary-200 shadow-2xl">
          <Image
            src="/logo.png"
            alt="Nación Campo Verde"
            fill
            className="object-contain"
            priority
          />
        </div>
>>>>>>> c52522c717933bb1ab82d9413fec7dc1719f5321
      </div>
    </section>
  );
}
