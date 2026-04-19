'use client';
// context/CartContext.tsx
import React, { createContext, useContext, useEffect, useReducer, useCallback } from 'react';
import { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'INCREMENT'; payload: string }
  | { type: 'DECREMENT'; payload: string }
  | { type: 'CLEAR' }
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'HYDRATE'; payload: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'HYDRATE':
      return { ...state, items: action.payload };

    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }

    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.id !== action.payload) };

    case 'INCREMENT':
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };

    case 'DECREMENT':
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.id === action.payload ? { ...i, quantity: i.quantity - 1 } : i
          )
          .filter((i) => i.quantity > 0),
      };

    case 'CLEAR':
      return { ...state, items: [] };

    case 'OPEN':
      return { ...state, isOpen: true };

    case 'CLOSE':
      return { ...state, isOpen: false };

    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('dctm_cart');
      if (saved) dispatch({ type: 'HYDRATE', payload: JSON.parse(saved) });
    } catch (_) {}
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dctm_cart', JSON.stringify(state.items));
    } catch (_) {}
  }, [state.items]);

  // Lock body scroll when cart is open
  useEffect(() => {
    document.body.style.overflow = state.isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [state.isOpen]);

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = state.items.reduce((s, i) => s + i.precio * i.quantity, 0);

  const addItem = useCallback((product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    dispatch({ type: 'OPEN' });
  }, []);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        totalItems,
        totalPrice,
        addItem,
        removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
        increment: (id) => dispatch({ type: 'INCREMENT', payload: id }),
        decrement: (id) => dispatch({ type: 'DECREMENT', payload: id }),
        clearCart: () => dispatch({ type: 'CLEAR' }),
        openCart: () => dispatch({ type: 'OPEN' }),
        closeCart: () => dispatch({ type: 'CLOSE' }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
