"use client";

import { useEffect, useCallback, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext'; // Integración carrito

type CowState = 'idle' | 'happy' | 'tickled' | 'running' | 'surprised';
type MessageType = 'greeting' | 'cart' | 'click' | 'doubleClick';

interface CowMessage {
  type: MessageType;
  text: string;
  duration: number;
}

const COW_SPRITES = {
  idle: '/sprites/cow-idle.png',
  happy: '/sprites/cow-happy.png',
  tickled: '/sprites/cow-laugh.png',
  running: '/sprites/cow-run.png',
  surprised: '/sprites/cow-surprised.png',
} as const;

const MESSAGES: Record<MessageType, string[]> = {
  greeting: ['¡Hola! 🐮👋', '¡Bienvenido!', '¿En qué te ayudo?'],
  cart: ['¡Excelente elección! 🛒', 'Carrito actualizado 😋', '¡Súper!'],
  click: ['¡Jeje! 😄', '¡Cosquillas!', '¡Muajaja!'],
  doubleClick: ['¡Corre vaca! 🏃‍♂️💨', '¡Uy qué susto!', '¡Nos vemos! 👋'],
};

export default function InteractiveCow({ onCowEvent }: { onCowEvent?: (event: string) => void }) {
  const [state, setState] = useState<CowState>('idle');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [followMouse, setFollowMouse] = useState(false);
  const [showMessage, setShowMessage] = useState<CowMessage | null>(null);
  const [position, setPosition] = useState({ x: 90, y: 90 });
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const { cartItems } = useCart();

  // Seguir cursor suavemente
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (followMouse) {
        setPosition({
          x: Math.max(20, Math.min(90, 90 - (e.clientX / window.innerWidth) * 40)),
          y: Math.max(20, Math.min(90, 90 - (e.clientY / window.innerHeight) * 40)),
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [followMouse]);

  // Auto transiciones estados
  useEffect(() => {
    if (animationRef.current) clearTimeout(animationRef.current);
    const timeouts: Record<CowState, number> = {
      idle: 3000,
      happy: 1500,
      tickled: 2000,
      running: 2500,
      surprised: 1200,
    };
    animationRef.current = setTimeout(() => setState('idle'), timeouts[state]);
    return () => {
      if (animationRef.current) clearTimeout(animationRef.current);
    };
  }, [state]);

  // React cart
  useEffect(() => {
    if (cartItems.length > 0) {
      setState('happy');
      showRandomMessage('cart');
    }
  }, [cartItems.length]);

  const showRandomMessage = (type: MessageType) => {
    const msg = {
      type,
      text: MESSAGES[type][Math.floor(Math.random() * MESSAGES[type].length)],
      duration: 2500,
    };
    setShowMessage(msg);
    setTimeout(() => setShowMessage(null), msg.duration);
  };

  const handleClick = useCallback(() => {
    const actions = {
      idle: 'tickled' as const,
      happy: 'surprised' as const,
      tickled: 'happy' as const,
      running: 'idle' as const,
      surprised: 'tickled' as const,
    };
    setState(actions[state]);
    showRandomMessage('click');
    onCowEvent?.('click');
  }, [state, onCowEvent]);

  const handleDoubleClick = useCallback(() => {
    setState('running');
    setFollowMouse(true);
    setTimeout(() => {
      setFollowMouse(false);
      showRandomMessage('doubleClick');
    }, 1000);
    onCowEvent?.('doubleClick');
  }, [onCowEvent]);

  const variants = {
    idle: { scale: 1, rotate: 0 },
    happy: { scale: 1.05, rotate: 5 },
    tickled: { scale: [1, 1.1, 1, 1.1, 1], rotate: [0, -2, 2, -2, 0], transition: { duration: 0.6 } },
    running: { x: [0, -20, 20, -20, 0], y: [0, -10, 0, -10, 0], rotate: [0, 10, -10, 10, 0] },
    surprised: { scale: [1, 1.3, 1], rotate: 0 },
  };

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-[999] cursor-pointer select-none"
      style={{ right: `${position.x}vw`, bottom: `${position.y}vh` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      variants={variants[state as keyof typeof variants]}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      whileHover={{ scale: 1.1 }}
      drag
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      dragElastic={0.2}
    >
      <motion.div className="relative w-24 h-24 md:w-32 md:h-32">
        <img
          src="/sprites/cow-idle.png"
          alt={`Vaca ${state}`}
          className="w-full h-full object-contain drop-shadow-2xl"
        />
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/90 text-white px-3 py-2 rounded-lg text-xs shadow-2xl whitespace-nowrap backdrop-blur-sm"
            >
              {showMessage.text}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
