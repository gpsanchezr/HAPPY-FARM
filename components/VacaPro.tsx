"use client";
import { useState, useEffect } from "react";
import "./vaca.css";

export default function VacaPro({ cartCount = 0 }) {
  const [mounted, setMounted] = useState(false);
  const [estado, setEstado] = useState("idle");
  const [mensaje, setMensaje] = useState("¡Hola! Soy tu asistente");
  const [imagenFalla, setImagenFalla] = useState(false);

  // Elimina error hidratación
  useEffect(() => { setMounted(true); }, []);

  // Reacción al carrito
  useEffect(() => {
    if (!mounted) return;
    if (cartCount > 0) {
      setEstado("happy");
      setMensaje("🛒 ¡Excelente elección!");
      setTimeout(() => setEstado("idle"), 3000);
    }
  }, [cartCount, mounted]);

  const handleClick = () => {
    setEstado("tickle");
    setMensaje("😂 ¡Me haces cosquillas!");
    setTimeout(() => { setEstado("idle"); setMensaje("Sigue comprando"); }, 2000);
  };

  if (!mounted) return null;

  return (
    <div className={`vaca ${estado}`} onClick={handleClick}>
      <div className="vaca-msg">{mensaje}</div>
      
      {/* Fallback emoji si imagen 404 */}
      {!imagenFalla ? (
        <img 
          src="/imagenes/vaca.png" 
          alt="Mascota" 
          onError={() => setImagenFalla(true)}
          className="w-full drop-shadow-lg"
        />
      ) : (
        <div className="text-[80px] leading-none drop-shadow-lg text-center" title="Guarda vaca.png en public/imagenes">
          🐮
        </div>
      )}
    </div>
  );
}
