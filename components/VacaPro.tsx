'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import './vaca.css';

interface ProductDetail {
  nombre: string;
  categoria: string;
}

const FRASES_IDLE = [
  '🌽 ¡Muuuucho maíz fresco!', 
  '🚚 ¡Yo te lo llevo!', 
  '🥕 ¡Qué ricas verduras!', 
  '¡Hola! ¿Qué buscas hoy?'
];

const SUGERENCIAS: Record<string, string[]> = {
  'Lácteos': ['¡Perfecto con queso costeño!', 'Prueba nuestro suero fresco! 🧀'],
  'Verduras': ['Combina con zanahoria crujiente!', '🥬 Brócoli del día!'],
  'Frutas': ['🍌 Banano perfecto para complementar!', 'Fresas recién cosechadas!'],
  'Panadería': ['Arepa de maíz recién hecha!', 'Pan artesanal calentito!'],
  'default': ['¡Gran elección!', '¡Eso es lo mejor del campo!', '¡Sabor auténtico!']
};

export default function VacaPro({ cartCount = 0 }: { cartCount?: number }) {
  const [estado, setEstado] = useState<'idle' | 'happy' | 'tickle' | 'sad'>('idle');
  const [mensaje, setMensaje] = useState('¡Hola! Soy Happy 🐮');
  const [mounted, setMounted] = useState(false);
  const usuarioInteractuo = useRef(false);
  const ultimoProducto = useRef<ProductDetail | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Voz
  const hablar = useCallback((texto: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis || !usuarioInteractuo.current) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'es-CO';
    utterance.rate = 1.2;
    utterance.pitch = 1.8; // Tono agudo
    utterance.volume = 0.8;
    
    window.speechSynthesis.speak(utterance);
  }, []);

  // Reaccionar
  const reaccionar = useCallback((nuevoEstado: typeof estado, nuevoMensaje: string) => {
    setEstado(nuevoEstado);
    setMensaje(nuevoMensaje);
    hablar(nuevoMensaje);
  }, [hablar]);

  // Desbloquear voz
  useEffect(() => {
    setMounted(true);
    const desbloquear = () => usuarioInteractuo.current = true;
    window.addEventListener('click', desbloquear, { once: true });
    window.addEventListener('touchstart', desbloquear, { once: true });
    return () => {
      window.removeEventListener('click', desbloquear);
      window.removeEventListener('touchstart', desbloquear);
    };
  }, []);

  // Carrito
  useEffect(() => {
    if (!mounted) return;
    if (cartCount > 0) {
      reaccionar('happy', '🛒 ¡Yupi! ¡Carrito lleno! 😋');
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => reaccionar('idle', '¿Más cositas?'), 3500);
    }
  }, [cartCount, mounted, reaccionar]);

  // Frases idle
  useEffect(() => {
    if (!mounted || estado !== 'idle') return;
    
    const interval = setInterval(() => {
      if (estado === 'idle') {
        const frase = FRASES_IDLE[Math.floor(Math.random() * FRASES_IDLE.length)];
        setMensaje(frase);
        hablar(frase);
      }
    }, 12000);

    return () => clearInterval(interval);
  }, [estado, mounted, hablar]);

  // Product interact
  useEffect(() => {
    if (!mounted) return;
    
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<ProductDetail>;
      const producto = customEvent.detail;
      
      ultimoProducto.current = producto;
      
      // Reacción inmediata
      const textoInmediato = `¡Mmm, el ${producto.nombre} es delicioso!`;
      reaccionar('happy', textoInmediato);
      
      // Sugerencia después de 3s
      setTimeout(() => {
        const sugerenciasCategoria = SUGERENCIAS[producto.categoria as keyof typeof SUGERENCIAS] || SUGERENCIAS.default;
        const sugerencia = sugerenciasCategoria[Math.floor(Math.random() * sugerenciasCategoria.length)];
        reaccionar('idle', sugerencia);
      }, 3000);
    };

    window.addEventListener('product:interact', handler);
    return () => window.removeEventListener('product:interact', handler);
  }, [mounted, reaccionar]);

  // Click (cosquillas)
  const handleClick = () => {
    usuarioInteractuo.current = true;
    reaccionar('tickle', '😂 ¡Jajaja cosquillas!');
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => reaccionar('idle', '¡Eres muy divertido! 😊'), 3000);
  };

  if (!mounted) return null;

  return (
    <div className={`vaca ${estado}`} onClick={handleClick}>
      <div className="vaca-msg">{mensaje}</div>
      <img src="/imagenes/vaca-mascota.gif" alt="Happy la vaca" className="vaca-img" />
    </div>
  );
}
