'use client';
// components/CatalogSection.tsx
import { useEffect, useRef, useState } from 'react';
import ProductCard, { ProductCardSkeleton } from './ProductCard';
import { getProducts } from '@/lib/supabase';
import { Product } from '@/types';
import { SlidersHorizontal } from 'lucide-react';

const CATEGORIES = ['Todos', 'Lácteos', 'Panadería', 'Huevos', 'Jugos', 'Otros'];

export default function CatalogSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError('No se pudieron cargar los productos. Intenta más tarde.'))
      .finally(() => setLoading(false));
  }, []);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    const els = sectionRef.current?.querySelectorAll('.reveal');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [products]);

  const filtered =
    activeCategory === 'Todos'
      ? products
      : products.filter((p) => p.categoria === activeCategory);

  return (
    <section id="productos" className="py-20 px-4 sm:px-6 lg:px-8" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        {/* ─── Header ─── */}
        <div className="text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 text-campo-tierra text-xs font-bold tracking-widest uppercase mb-3">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Catálogo
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-campo-oscuro mb-4">
            Nuestros Productos
          </h2>
          <p className="text-campo-oscuro/60 max-w-lg mx-auto text-base leading-relaxed">
            Todo fresco, todo local, todo con amor. Cada producto viene directamente
            de los productores del Caribe colombiano.
          </p>
        </div>

        {/* ─── Category filter ─── */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 reveal">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-campo-verde text-campo-crema shadow-md'
                  : 'bg-campo-card text-campo-oscuro/60 hover:bg-campo-tierra/15 hover:text-campo-oscuro'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ─── Error state ─── */}
        {error && (
          <div className="text-center py-16">
            <p className="text-red-500/70 text-sm bg-red-50 rounded-2xl py-6 px-8 inline-block">
              {error}
            </p>
          </div>
        )}

        {/* ─── Grid ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            : filtered.map((product, i) => (
                <div
                  key={product.id}
                  className="reveal"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
        </div>

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-16 text-campo-oscuro/40 text-sm">
            No hay productos en esta categoría por el momento.
          </div>
        )}
      </div>
    </section>
  );
}
