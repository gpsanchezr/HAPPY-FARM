'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type ProductKey = 'queso' | 'suero';

export interface StockItem {
  nombre: string;
  precio: number;
  stock: number;
}

export type StockData = Record<ProductKey, StockItem>;

export type CartData = Record<ProductKey, number>;

export interface Cliente {
  nombre: string;
  telefono: string;
  direccion: string;
  notas?: string;
}

export interface PedidoItem {
  producto: ProductKey;
  cantidad: number;
}

export interface PedidoConfirmado {
  cliente: {
    nombre: string;
    telefono: string;
    direccion: string;
  };
  pedido: PedidoItem[];
  total: number;
  id?: string;
  fecha?: string;
}

interface InventoryContextValue {
  stock: StockData | null;
  cart: CartData;
  addToCart: (product: ProductKey) => void;
  clearCart: () => void;
  confirmOrder: (cliente: Cliente) => PedidoConfirmado | null;
}

const InventoryContext = createContext<InventoryContextValue | null>(null);

export function useInventory() {
  const ctx = useContext(InventoryContext);
  if (!ctx) throw new Error('useInventory debe usarse dentro de InventoryProvider');
  return ctx;
}

const emptyCart: CartData = { queso: 0, suero: 0 };

export default function InventoryProvider({ children }: { children: React.ReactNode }) {
  const [stock, setStock] = useState<StockData | null>(null);
  const [cart, setCart] = useState<CartData>(emptyCart);

  const STORAGE_KEY = 'tienda-campo-stock';

  // Inicializar stock: primero intentar leer desde localStorage, si no existe
  // entonces cargar `public/stock.json` y usar ese valor.
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as StockData;
          setStock(parsed);
          return;
        }
      }
    } catch (e) {
      // ignore and fallback to fetch
    }

    fetch('/stock.json')
      .then((res) => res.json())
      .then((data) => {
        const normalized: StockData = {
          queso: data.queso,
          suero: data.suero,
        };
        setStock(normalized);
        try {
          if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
          }
        } catch (e) {
          // ignore storage errors
        }
      })
      .catch(() => {
        setStock(null);
      });
  }, []);

  // Persistir cambios de stock en localStorage para mantener estado entre recargas
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && stock) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stock));
      }
    } catch (e) {
      // ignore storage errors
    }
  }, [stock]);

  const addToCart = (product: ProductKey) => {
    if (!stock) return;

    const available = stock[product].stock;
    setCart((prev) => {
      const nextQty = (prev[product] ?? 0) + 1;
      // Verificar stock suficiente antes de agregar
      if (nextQty > available) return prev;
      return { ...prev, [product]: nextQty };
    });
  };

  const clearCart = () => setCart(emptyCart);

  const confirmOrder = (cliente: Cliente): PedidoConfirmado | null => {
    if (!stock) return null;

    const pedido: PedidoItem[] = (Object.keys(cart) as ProductKey[])
      .filter((k) => cart[k] > 0)
      .map((k) => ({ producto: k, cantidad: cart[k] }));

    if (pedido.length === 0) return null;

    // Verificación final de stock suficiente
    for (const item of pedido) {
      if (stock[item.producto].stock < item.cantidad) return null;
    }

    const total = pedido.reduce(
      (sum, item) => sum + stock[item.producto].precio * item.cantidad,
      0,
    );

    const resultado: PedidoConfirmado = {
      cliente: {
        nombre: cliente.nombre,
        telefono: cliente.telefono,
        direccion: cliente.direccion,
      },
      pedido,
      total,
      id: 'ORD-' + Math.random().toString(36).slice(2, 10).toUpperCase(),
      fecha: new Date().toLocaleString(),
    };

    // Actualizar stock global (en memoria) y reflejar en UI inmediatamente
    setStock((prev) => {
      if (!prev) return prev;
      const next: StockData = { ...prev };
      for (const item of pedido) {
        next[item.producto] = {
          ...next[item.producto],
          stock: Math.max(0, next[item.producto].stock - item.cantidad),
        };
      }
      return next;
    });

    // Limpiar carrito después de confirmar
    setCart(emptyCart);

    // Envío por API desactivado: ahora se usa el botón wa.me desde la factura.
    // (Si deseas reactivar el envío automático por API, descomenta el bloque siguiente
    // y asegúrate de configurar las credenciales en el servidor.)
    /*
    try {
      fetch('/api/send-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resultado),
      }).catch((err) => console.error('WhatsApp notify error', err));
    } catch (e) {
      // ignore
    }
    */

    return resultado;
  };

  const value = useMemo<InventoryContextValue>(
    () => ({ stock, cart, addToCart, clearCart, confirmOrder }),
    [stock, cart],
  );

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
}
