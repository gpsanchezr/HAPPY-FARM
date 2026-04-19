<<<<<<< HEAD
'use client';
// components/Values.tsx
import { useEffect, useRef } from 'react';
import { Truck, Leaf, Clock, ShieldCheck, Star, Recycle } from 'lucide-react';

const values = [
  {
    icon: <Truck className="w-6 h-6" />,
    title: 'Entrega a domicilio',
    desc: 'Llevamos tus productos directamente a la puerta de tu hogar en Barranquilla.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    title: 'Productos Artesanales',
    desc: 'Elaborados con técnicas tradicionales del Caribe colombiano, sin conservantes.',
    color: 'bg-campo-verde/10 text-campo-verde',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Siempre Frescos',
    desc: 'Recibimos los productos directamente del productor. Nada de intermediarios.',
    color: 'bg-campo-tierra/10 text-campo-tierra',
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Calidad Garantizada',
    desc: 'Si no estás satisfecho, te devolvemos tu dinero o reponemos el producto.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: 'Atención Personalizada',
    desc: 'Giseella y nuestro equipo te acompañan en cada pedido por WhatsApp.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: <Recycle className="w-6 h-6" />,
    title: 'Economía Local',
    desc: 'Comprarnos es apoyar directamente a familias productoras del Caribe.',
    color: 'bg-purple-50 text-purple-600',
  },
];

export default function Values() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    ref.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-campo-crema" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 text-campo-tierra text-xs font-bold tracking-widest uppercase mb-3">
            <Star className="w-3.5 h-3.5" />
            ¿Por qué elegirnos?
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-campo-oscuro">
            Más que una tienda,<br />
            <span className="text-campo-verde">una comunidad.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="reveal bg-white rounded-4xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group border border-campo-tierra/8"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${v.color} transition-transform duration-200 group-hover:scale-110`}>
                {v.icon}
              </div>
              <h3 className="font-bold text-campo-oscuro text-base mb-2">{v.title}</h3>
              <p className="text-campo-oscuro/55 text-sm leading-relaxed">{v.desc}</p>
=======
export default function Values() {
  const values = [
    {
      id: 1,
      title: "Calidad Premium",
      description: "Productos seleccionados con los más altos estándares de calidad",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "100% Natural",
      description: "Sin químicos ni pesticidas, directo de la naturaleza",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Tradición",
      description: "Métodos tradicionales transmitidos por generaciones",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Frescura",
      description: "Cosechados y entregados en su punto óptimo de madurez",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: 5,
      title: "Servicio",
      description: "Atención personalizada y compromiso con tu satisfacción",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      id: 6,
      title: "Sostenibilidad",
      description: "Comprometidos con el medio ambiente y la comunidad",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Nuestros Valores
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Los principios que nos guían en cada paso del camino
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value) => (
            <div
              key={value.id}
              className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-5">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
>>>>>>> c52522c717933bb1ab82d9413fec7dc1719f5321
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
