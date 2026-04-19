'use client';
// components/ProductCard.tsx
import Image from 'next/image';
import { ShoppingCart, Package } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import toast from 'react-hot-toast';

export function ProductCardSkeleton() {
  return (
    <div className="bg-campo-card rounded-4xl overflow-hidden shadow-sm">
      <div className="skeleton-shimmer h-52 w-full rounded-t-4xl" />
      <div className="p-5 space-y-3">
        <div className="skeleton-shimmer h-5 w-3/4 rounded-full" />
        <div className="skeleton-shimmer h-3.5 w-full rounded-full" />
        <div className="skeleton-shimmer h-3.5 w-2/3 rounded-full" />
        <div className="flex items-center justify-between mt-4">
          <div className="skeleton-shimmer h-7 w-24 rounded-full" />
          <div className="skeleton-shimmer h-10 w-10 rounded-2xl" />
        </div>
        <div className="skeleton-shimmer h-10 w-full rounded-2xl mt-2" />
      </div>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

const handleAdd = () => {
    // Emitir evento para vaca
    window.dispatchEvent(new CustomEvent('product:interact', { 
      detail: { 
        nombre: product.nombre, 
        categoria: product.categoria,
        precio: product.precio 
      } 
    }));
    
    addItem(product);
    toast.success(`¡${product.nombre} añadido al carrito! 🛒`, {
      duration: 2500,
    });
  };

  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(product.precio);

  return (
    <div className="product-card bg-campo-card rounded-4xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col">
      {/* ─── Image ─── */}
      <div className="relative h-52 overflow-hidden bg-campo-tierra/10">
        {product.imagen_url ? (
          <Image
            src={product.imagen_url}
            alt={product.nombre}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover product-img"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-campo-tierra/20 to-campo-verde/20">
            <Package className="w-12 h-12 text-campo-tierra/40" />
          </div>
        )}
        {/* Category tag */}
        <div className="absolute top-3 left-3">
          <span className="bg-campo-crema/90 backdrop-blur-sm text-campo-oscuro text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full border border-campo-tierra/20">
            {product.categoria}
          </span>
        </div>
      </div>

      {/* ─── Info ─── */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-campo-oscuro text-base mb-1 line-clamp-1">
          {product.nombre}
        </h3>
        <p className="text-sm text-campo-oscuro/55 leading-relaxed mb-4 line-clamp-2 flex-1">
          {product.descripcion}
        </p>

        <div className="flex items-center justify-between">
          <span className="font-bold text-campo-tierra text-xl font-serif">
            {formattedPrice}
          </span>
          <span className="text-xs text-campo-oscuro/40 font-medium">
            Stock: {product.stock}
          </span>
        </div>

        <button
          onClick={handleAdd}
          disabled={product.stock === 0}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-campo-verde text-campo-crema py-3 rounded-2xl font-semibold text-sm hover:bg-campo-verde-light transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          <ShoppingCart className="w-4 h-4" />
          {product.stock === 0 ? 'Agotado' : 'Añadir al Carrito'}
        </button>
      </div>
    </div>
  );
}
