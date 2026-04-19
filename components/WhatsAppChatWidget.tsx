'use client';
// components/WhatsAppChatWidget.tsx
import { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || '573000000000';

interface WhatsAppChatWidgetProps {
  currentProduct?: string | null;
  fromCart?: boolean;
}

export default function WhatsAppChatWidget({
  currentProduct = null,
  fromCart = false,
}: WhatsAppChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [pulseOnce, setPulseOnce] = useState(false);

  // Build smart pre-filled message
  const getPrefilledMessage = () => {
    if (currentProduct) {
      return `Hola, estoy interesado en el *${currentProduct}* que vi en la web 🌿`;
    }
    if (fromCart) {
      return 'Hola, tengo una duda sobre mi pedido actual 🛒';
    }
    return 'Hola, quisiera saber más sobre sus productos frescos 🌾';
  };

  useEffect(() => {
    // Show tooltip after 4s, then pulse
    const t1 = setTimeout(() => setShowTooltip(true), 4000);
    const t2 = setTimeout(() => { setShowTooltip(false); setPulseOnce(true); }, 8000);
    const t3 = setTimeout(() => setPulseOnce(false), 8400);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  const handleStartChat = () => {
    const msg = inputMsg.trim() || getPrefilledMessage();
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* ─── Pop-up chat window ─── */}
      {isOpen && (
        <div className="wa-chat-popup w-80 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Chat header */}
          <div className="bg-[#25D366] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl">🌿</span>
              </div>
              <div>
                <p className="text-white font-bold text-sm">Giseella</p>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  <p className="text-white/80 text-xs">En línea ahora</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 hover:bg-white/20 rounded-full flex items-center justify-center transition"
              aria-label="Cerrar"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Chat body */}
          <div className="p-4 bg-[#ECE5DD] min-h-[140px] flex flex-col gap-3">
            {/* Bot message */}
            <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm max-w-[90%]">
              <p className="text-campo-oscuro text-sm leading-relaxed">
                ¡Hola! Soy{' '}
                <span className="font-bold text-[#25D366]">Giseella</span>. ¿En qué
                puedo ayudarte hoy con tu pedido del campo? 🌾
              </p>
              <p className="text-[10px] text-gray-400 mt-1.5 text-right">ahora</p>
            </div>

            {/* Pre-filled suggestion */}
            <div className="self-end bg-[#DCF8C6] rounded-2xl rounded-tr-sm px-4 py-2.5 shadow-sm max-w-[90%]">
              <p className="text-campo-oscuro text-xs leading-relaxed italic opacity-70">
                {getPrefilledMessage()}
              </p>
              <p className="text-[10px] text-gray-400 mt-1 text-right">sugerencia ✓✓</p>
            </div>
          </div>

          {/* Input area */}
          <div className="px-4 py-3 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleStartChat()}
                placeholder="Escribe tu mensaje..."
                className="flex-1 text-sm bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2 focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366]/20 transition"
              />
              <button
                onClick={handleStartChat}
                className="w-9 h-9 bg-[#25D366] rounded-full flex items-center justify-center hover:bg-[#1ebe5a] transition flex-shrink-0"
                aria-label="Enviar"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
            <p className="text-center text-[10px] text-gray-400 mt-2">
              Continuarás en WhatsApp Business
            </p>
          </div>
        </div>
      )}

      {/* ─── Tooltip ─── */}
      {showTooltip && !isOpen && (
        <div className="bg-campo-oscuro text-campo-crema text-xs font-medium px-3 py-1.5 rounded-full shadow-lg animate-fade-in">
          ¿Necesitas ayuda? 👋
        </div>
      )}

      {/* ─── Float button ─── */}
      <button
        onClick={() => { setIsOpen(!isOpen); setShowTooltip(false); }}
        className={`w-14 h-14 bg-[#25D366] text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:bg-[#1ebe5a] hover:scale-110 active:scale-95 ${
          pulseOnce ? 'ring-4 ring-[#25D366]/40' : ''
        }`}
        aria-label="Chat WhatsApp"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        )}
      </button>
    </div>
  );
}
