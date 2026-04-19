'use client';
import { useState, useEffect, useRef } from 'react';
import './vaca.css';

const frases = ['🌽 ¡Muuuucho maíz fresco!', '🚚 ¡Yo te lo llevo a Barranquilla!', '🥕 ¡Qué ricas verduras!', '¿Jugamos o compramos?'];

export default function VacaPro({ cartCount = 0 }) {
  const [mounted, setMounted] = useState(false);
  const [estado, setEstado] = useState('idle');
  const [mensaje, setMensaje] = useState('¡Hola! Soy Happy 🐮');
  const usuarioInteractuo = useRef(false);

  const hablarVoz = (texto) => {
    if (typeof window !== 'undefined' && window.speechSynthesis && usuarioInteractuo.current) {
      window.speechSynthesis.cancel();
      const speech = new SpeechSynthesisUtterance(texto);
      speech.lang = 'es-CO';
      speech.rate = 1.15; // Un poco más rápido, como un niño emocionado
      speech.pitch = 1.8; // Tono muy agudo para voz de bebé/dibujo animado
      window.speechSynthesis.speak(speech);
    }
  };

  const reaccionar = (nuevoEstado, nuevoMensaje) => {
    setEstado(nuevoEstado);
    setMensaje(nuevoMensaje);
    hablarVoz(nuevoMensaje);
  };

  useEffect(() => {
    setMounted(true);
    const desbloquearVoz = () => { usuarioInteractuo.current = true; };
    window.addEventListener('click', desbloquearVoz, { once: true });
    return () => window.removeEventListener('click', desbloquearVoz);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (cartCount > 0) {
      reaccionar('happy', '🛒 ¡Yupi! ¡Comida nueva!');
      setTimeout(() => reaccionar('idle', '¿Llevamos más?'), 4000);
    }
  }, [cartCount, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      if (estado === 'idle') {
        const random = Math.floor(Math.random() * frases.length);
        reaccionar('idle', frases[random]);
      }
    }, 12000);
    return () => clearInterval(interval);
  }, [estado, mounted]);

  const handleClick = () => {
    usuarioInteractuo.current = true;
    reaccionar('tickle', '😂 ¡Jajaja! ¡Cosquillas no!');
    setTimeout(() => reaccionar('idle', '¡Eres muy divertido!'), 3000);
  };

  if (!mounted) return null;

  return (
    <div className={`vaca ${estado}`} onClick={handleClick}>
      <div className="vaca-msg">{mensaje}</div>
      <img src="/imagenes/vaca.png" alt="Happy" className="vaca-img drop-shadow-lg" />
    </div>
  );
}
