<<<<<<< HEAD
'use client';
// components/Navbar.tsx
import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Leaf } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { totalItems, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [badgePulse, setBadgePulse] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (totalItems > 0) {
      setBadgePulse(true);
      const t = setTimeout(() => setBadgePulse(false), 400);
      return () => clearTimeout(t);
    }
  }, [totalItems]);

  const navLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#productos', label: 'Productos' },
    { href: '#nosotros', label: 'Nosotros' },
    { href: '#contacto', label: 'Contacto' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'navbar-blur shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-4">
            {/* ─── Logo ─── */}
            <a href="#inicio" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-campo-verde rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
                <Leaf className="w-5 h-5 text-campo-crema" />
              </div>
              <div className="leading-none">
                <span className="block font-serif text-lg font-bold text-campo-verde">
                  Del Campo
                </span>
                <span className="block text-[10px] font-semibold tracking-[0.18em] text-campo-tierra uppercase">
                  A Tu Mesa
                </span>
              </div>
            </a>

            {/* ─── Desktop Links ─── */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="px-4 py-2 text-sm font-medium text-campo-oscuro/70 hover:text-campo-verde rounded-xl hover:bg-campo-verde/8 transition-all duration-200"
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* ─── Actions ─── */}
            <div className="flex items-center gap-3">
              <button
                onClick={openCart}
                className="relative flex items-center gap-2 bg-campo-verde text-campo-crema px-4 py-2 rounded-2xl font-semibold text-sm hover:bg-campo-verde-light transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
                aria-label="Abrir carrito"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Carrito</span>
                {totalItems > 0 && (
                  <span
                    className={`absolute -top-2 -right-2 min-w-[20px] h-5 bg-campo-tierra text-white text-xs font-bold rounded-full flex items-center justify-center px-1 ${
                      badgePulse ? 'badge-pulse' : ''
                    }`}
                  >
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-xl hover:bg-campo-verde/10 transition"
                aria-label="Menú"
              >
                {menuOpen ? (
                  <X className="w-5 h-5 text-campo-oscuro" />
                ) : (
                  <Menu className="w-5 h-5 text-campo-oscuro" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ─── Mobile Menu ─── */}
        {menuOpen && (
          <div className="md:hidden bg-campo-crema/95 backdrop-blur-md border-t border-campo-tierra/10 px-4 pb-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 px-3 text-sm font-medium text-campo-oscuro/80 hover:text-campo-verde border-b border-campo-tierra/10 last:border-0"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </>
=======
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-4">
            <div className="relative w-16 h-16">
              <Image
                src="/logo.png"
                alt="Nación Campo Verde"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-2xl font-bold text-primary-700">
              Nación Campo Verde
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <a
              href="#inicio"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition duration-200"
            >
              Inicio
            </a>
            <a
              href="#productos"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition duration-200"
            >
              Productos
            </a>
            <a
              href="#nosotros"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition duration-200"
            >
              Nosotros
            </a>
            <a
              href="#contacto"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition duration-200"
            >
              Contacto
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-primary-600 p-2">
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
>>>>>>> c52522c717933bb1ab82d9413fec7dc1719f5321
  );
}
