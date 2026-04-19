'use client';
// components/CartSidebar.tsx
import Image from 'next/image';
import { X, Minus, Plus, Trash2, ShoppingBag, Package } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import CheckoutForm from './CheckoutForm';

export default function CartSidebar() {
  const { items, isOpen, closeCart, increment, decrement, removeItem, totalItems, totalPrice } =
    useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  const formatted = (n: number) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(n);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="cart-overlay" onClick={closeCart} />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-campo-crema shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-campo-tierra/15">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-campo-verde rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-campo-crema" />
            </div>
            <div>
              <h2 className="font-bold text-campo-oscuro text-base">Mi Carrito</h2>
              <p className="text-xs text-campo-oscuro/50">{totalItems} producto{totalItems !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="w-9 h-9 rounded-xl hover:bg-campo-tierra/15 flex items-center justify-center transition"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5 text-campo-oscuro/60" />
          </button>
        </div>

        {/* ─── Items ─── */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 pb-12">
              <div className="w-20 h-20 bg-campo-tierra/10 rounded-full flex items-center justify-center">
                <Package className="w-10 h-10 text-campo-tierra/50" />
              </div>
              <div>
                <p className="font-semibold text-campo-oscuro/60 text-sm mb-1">Tu carrito está vacío</p>
                <p className="text-xs text-campo-oscuro/40">¡Agrega productos del catálogo!</p>
              </div>
              <button
                onClick={closeCart}
                className="mt-2 bg-campo-verde text-campo-crema px-6 py-2.5 rounded-2xl text-sm font-semibold hover:bg-campo-verde-light transition"
              >
                Ver Catálogo
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 bg-white rounded-3xl p-3 shadow-sm"
              >
                {/* Image */}
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-campo-tierra/10 flex-shrink-0">
                  {item.imagen_url ? (
                    <Image
                      src={item.imagen_url}
                      alt={item.nombre}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-6 h-6 text-campo-tierra/40" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-campo-oscuro text-sm truncate">{item.nombre}</p>
                  <p className="text-campo-tierra font-bold text-sm">{formatted(item.precio)}</p>

                  {/* Qty controls */}
                  <div className="flex items-center gap-2 mt-1.5">
                    <button
                      onClick={() => decrement(item.id)}
                      className="w-6 h-6 rounded-lg bg-campo-card hover:bg-campo-tierra/20 flex items-center justify-center transition"
                      aria-label="Disminuir"
                    >
                      <Minus className="w-3 h-3 text-campo-oscuro" />
                    </button>
                    <span className="text-sm font-bold text-campo-oscuro w-5 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increment(item.id)}
                      className="w-6 h-6 rounded-lg bg-campo-card hover:bg-campo-verde/20 flex items-center justify-center transition"
                      aria-label="Aumentar"
                    >
                      <Plus className="w-3 h-3 text-campo-oscuro" />
                    </button>
                    <span className="text-xs text-campo-oscuro/40 ml-1">
                      = {formatted(item.precio * item.quantity)}
                    </span>
                  </div>
                </div>

                {/* Delete */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="w-7 h-7 rounded-xl hover:bg-red-50 flex items-center justify-center flex-shrink-0 transition"
                  aria-label="Eliminar"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* ─── Footer ─── */}
        {items.length > 0 && !showCheckout && (
          <div className="px-6 py-5 border-t border-campo-tierra/15 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-campo-oscuro/60 text-sm font-medium">Total</span>
              <span className="text-campo-tierra font-bold text-xl font-serif">
                {formatted(totalPrice)}
              </span>
            </div>
            <button
              onClick={() => setShowCheckout(true)}
              className="w-full bg-campo-verde text-campo-crema py-4 rounded-2xl font-bold text-base hover:bg-campo-verde-light transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] shadow-lg"
            >
              Confirmar Pedido →
            </button>
            <p className="text-center text-xs text-campo-oscuro/40">
              Se enviará por WhatsApp para coordinar entrega
            </p>
          </div>
        )}

        {/* ─── Checkout Form ─── */}
        {showCheckout && (
          <div className="flex-1 overflow-y-auto">
            <CheckoutForm onBack={() => setShowCheckout(false)} />
          </div>
        )}
      </div>
    </>
  );
}
