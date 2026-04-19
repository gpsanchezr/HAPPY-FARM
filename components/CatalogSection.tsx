'use client';
<<<<<<< HEAD
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
=======

import Image from "next/image";
import { useMemo, useState } from "react";
import CheckoutForm from "@/components/CheckoutForm";
import Invoice from "@/components/Invoice";
import { Cliente, ProductKey, PedidoConfirmado, StockData, useInventory } from "@/components/InventoryProvider";

export default function CatalogSection() {
  const { stock, cart, addToCart, confirmOrder } = useInventory();
  const [showCheckout, setShowCheckout] = useState(false);
  const [invoice, setInvoice] = useState<PedidoConfirmado | null>(null);

  const products = [
    {
      id: 1,
      name: "Queso Campesino",
      image: "/queso.jpg",
      key: "queso" as ProductKey,
    },
    {
      id: 2,
      name: "Suero Costeño",
      image: "/suero.jpg",
      key: "suero" as ProductKey,
    },
  ];

  const carrito = useMemo(() => {
    if (!stock) return [];
    return (Object.keys(cart) as ProductKey[])
      .filter((k) => cart[k] > 0)
      .map((k) => ({ producto: k, cantidad: cart[k], precio: stock[k].precio }));
  }, [cart, stock]);

  const total = useMemo(() => {
    return carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  }, [carrito]);

  const handleConfirm = (cliente: Cliente) => {
    const pedidoConfirmado = confirmOrder(cliente);
    if (pedidoConfirmado) {
      // Mostrar factura visual inmediatamente
      setInvoice(pedidoConfirmado);
      setShowCheckout(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Catálogo de Productos Especiales
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nuestros productos más solicitados, seleccionados con cuidado para tu deleite.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {products.map((product) => {
            const productStock = stock ? stock[product.key] : null;
            const isOutOfStock = !productStock || productStock.stock === 0;

            return (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {/* Product Image */}
                <div className="relative h-80 bg-gray-100 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover hover:scale-105 transition duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>

                  {productStock && (
                    <>
                      <p className="text-3xl font-bold text-primary-600 mb-2">
                        ${productStock.precio.toLocaleString()}
                        <span className="text-sm text-gray-500 font-normal"> / unidad</span>
                      </p>

                      <div className="mb-6">
                        {isOutOfStock ? (
                          <p className="text-lg font-bold text-gray-900">AGOTADO</p>
                        ) : (
                          <p className="text-lg text-gray-600">Disponible: {productStock.stock}</p>
                        )}
                      </div>
                    </>
                  )}

                  <button
                    onClick={() => addToCart(product.key)}
                    disabled={isOutOfStock}
                    className={`w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition duration-300 transform hover:scale-105 ${
                      isOutOfStock ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Agregar al pedido
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {carrito.length > 0 && (
          <div className="max-w-4xl mx-auto mt-10">
            <button
              onClick={() => setShowCheckout(true)}
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition duration-300"
            >
              Confirmar pedido (${total.toLocaleString()})
            </button>
          </div>
        )}

        {showCheckout && (
          <CheckoutForm
            carrito={carrito}
            onCancel={() => setShowCheckout(false)}
            onConfirm={handleConfirm}
          />
        )}

        {invoice && (
          <Invoice
            pedido={invoice}
            stock={stock as StockData}
            onClose={() => setInvoice(null)}
          />
>>>>>>> c52522c717933bb1ab82d9413fec7dc1719f5321
        )}
      </div>
    </section>
  );
}
