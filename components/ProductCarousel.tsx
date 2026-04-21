'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/types";

interface CarouselProduct extends Product {
  key: string;
}

export default function ProductCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState<CarouselProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch featured products from Supabase
  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('productos')
          .select('*')
          .eq('destacado', true)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        const productsWithKey = (data || []).map((p: Product) => ({ ...p, key: p.id }));
        setFeaturedProducts(productsWithKey);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedProducts();
  }, []);

  const products = featuredProducts.length > 0 ? featuredProducts : [
    {
      id: "1",
      nombre: "Queso Campesino",
      imagen_url: "https://cgskfhhcmokoairzfcxa.supabase.co/storage/v1/object/public/catalogo/queso.jpg",
      precio: 25000,
      stock: 50,
      descripcion: "Queso fresco del campo",
      categoria: "Lácteos",
      key: "queso"
    },
    {
      id: "2",
      nombre: "Suero Costeño",
      imagen_url: "https://cgskfhhcmokoairzfcxa.supabase.co/storage/v1/object/public/catalogo/suero.jpg",
      precio: 15000,
      stock: 30,
      descripcion: "Suero costeño tradicional",
      categoria: "Lácteos",
      key: "suero"
    },
  ] as CarouselProduct[];

  // Autoplay
  useEffect(() => {
    if (!isAutoplay || loading) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoplay, products.length, loading]);

  const goToSlide = (index: number) => {
    const currentProduct = products[index];
    window.dispatchEvent(new CustomEvent('product:interact', { 
      detail: { 
        nombre: currentProduct.nombre, 
        categoria: 'destacado',
        precio: currentProduct.precio 
      } 
    }));
    
    setCurrentSlide(index);
    setIsAutoplay(false);
    setTimeout(() => setIsAutoplay(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % products.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + products.length) % products.length);
  };

  if (loading && featuredProducts.length === 0) {
    return (
      <section id="destacados" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Productos Destacados
          </h2>
          <div className="h-96 bg-gray-200 animate-pulse rounded-lg" />
        </div>
      </section>
    );
  }

  const currentProduct = products[currentSlide];

  return (
    <section id="destacados" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Productos Destacados
        </h2>

        <div className="relative bg-gray-100 rounded-lg overflow-hidden shadow-lg">
          <div className="relative h-64 sm:h-96 bg-gray-200">
            <Image
              src={currentProduct.imagen_url}
              alt={currentProduct.nombre}
              fill
              className="object-contain"
              priority
              unoptimized={true}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 py-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {currentProduct.nombre}
            </h3>
            <div className="text-white/80 text-lg space-y-2">
              <p>Precio: {currentProduct.precio?.toLocaleString('es-CO', { 
                style: 'currency', 
                currency: 'COP' 
              })}</p>
              {currentProduct.stock > 0 ? (
                <p className="font-semibold">Disponible: {currentProduct.stock} uds</p>
              ) : (
                <p className="font-bold text-red-400">AGOTADO</p>
              )}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Anterior"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Siguiente"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-amber-500 w-8 scale-110" : "bg-gray-300 hover:bg-gray-400"}`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

