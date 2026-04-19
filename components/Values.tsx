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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
