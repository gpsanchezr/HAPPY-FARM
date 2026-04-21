'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { useInventory } from "@/components/InventoryProvider";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/types";

export default function ProductCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const { stock } = useInventory();

  // Fetch featured products from Supabase
  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const { data, error } = await supabase
          .from('productos')
          .select('*')
          .eq('destacado', true)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setFeaturedProducts(data || []);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    }

    fetchFeaturedProducts();
  }, []);

  const products = featuredProducts.length > 0 ? featuredProducts.map(p => ({ ...p, key: p.id })) : [
    {
      id: "1",
      nombre: "Queso Campesino",
      imagen_url: "/queso.jpg",
      key: "queso",
      precio: 25000,
      stock: 50
    },
    {
      id: "2",
      nombre: "Suero Costeño",
      imagen_url: "/suero.jpg",
      key: "suero",
      precio: 15000,
      stock: 30
    },
  ] as Product[];

  // Autoplay
  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 4000); // Cambiar cada 4 segundos

    return () => clearInterval(interval);
  }, [isAutoplay, products.length]);

const goToSlide = (index: number) => {
    // Emitir evento para vaca
    const currentProduct = products[index];
    window.dispatchEvent(new CustomEvent('product:interact', { 
      detail: { 
        nombre: currentProduct.nombre, 
        categoria: 'destacado',
        precio: currentProduct.precio || (stock as any)[currentProduct.key || currentProduct.id]?.precio || 0 
      } 
    }));
    
    setCurrentSlide(index);
    setIsAutoplay(false);
    // Reanudar autoplay después de 10 segundos
    setTimeout(() => setIsAutoplay(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % products.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + products.length) % products.length);
  };

  const currentProduct = products[currentSlide];

  return (
    <section id="destacados" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Productos Destacados
        </h2>

        {/* Main Slider Container */}
        <div className="relative bg-gray-100 rounded-lg overflow-hidden shadow-lg">
          {/* Slide */}
          <div className="relative h-64 sm:h-96 bg-gray-200">
            <Image
              src={currentProduct.imagen_url || '/placeholder-product.jpg'}
              alt={currentProduct.nombre}
              fill
              className="object-contain"
              priority
              unoptimized={true}
            />
            {/* Fallback gradient if image fails */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 opacity-0 hover:opacity-0" />
          </div>

          {/* Product Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 py-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {currentProduct.nombre}
            </h3>
            <div className="text-white/80 text-lg space-y-2">
                <p>Precio: {currentProduct.precio?.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) || 'N/A'}</p>
                {currentProduct.stock > 0 ? (
                  <p>Disponible: {currentProduct.stock}</p>
                ) : (
                  <p className="font-bold">AGOTADO</p>
                )}
              </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-900 p-3 rounded-full shadow-lg transition duration-300"
            aria-label="Anterior"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-900 p-3 rounded-full shadow-lg transition duration-300"
            aria-label="Siguiente"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition duration-300 ${
                index === currentSlide
                  ? "bg-primary-600 w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
