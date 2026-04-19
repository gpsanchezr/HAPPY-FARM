'use client';
// components/CheckoutForm.tsx
import { useState } from 'react';
import { ChevronLeft, Send, MapPin, User, Phone, Home } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { createOrder } from '@/lib/supabase';
import toast from 'react-hot-toast';

const BARRANQUILLA_BARRIOS = [
  'El Prado', 'Alto Prado', 'Villa Campestre', 'El Golf', 'La Castellana',
  'Riomar', 'Ciudad Jardín', 'El Limoncito', 'Manga', 'Boston',
  'Barrio Abajo', 'Modelo', 'Los Alpes', 'El Recreo', 'Las Nieves',
  'Villa Santos', 'Buenavista', 'Las Flores', 'San Salvador', 'Otro',
];

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || '573000000000';

interface CheckoutFormProps {
  onBack: () => void;
}

export default function CheckoutForm({ onBack }: CheckoutFormProps) {
  const { items, totalPrice, clearCart, closeCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    barrio: '',
    notas: '',
  });

  const formatted = (n: number) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.telefono || !form.direccion || !form.barrio) {
      toast.error('Por favor completa todos los campos requeridos.');
      return;
    }

    setLoading(true);
    try {
      // 1. Save order in Supabase
      await createOrder({
        cliente_nombre: form.nombre,
        cliente_telefono: form.telefono,
        cliente_direccion: `${form.direccion}, Barrio ${form.barrio}`,
        cliente_barrio: form.barrio,
        detalle_carrito: items,
        total_pago: totalPrice,
        metodo_entrega: 'domicilio',
        estado: 'pendiente',
      });

      // 2. Build WhatsApp message
      const itemsText = items
        .map((i) => `• ${i.nombre} x${i.quantity} = ${formatted(i.precio * i.quantity)}`)
        .join('\n');

      const message = `🌿 *NUEVO PEDIDO - Del Campo a Tu Mesa* 🌿

👤 *Cliente:* ${form.nombre}
📞 *Teléfono:* ${form.telefono}
📍 *Dirección:* ${form.direccion}
🏘️ *Barrio:* ${form.barrio}

🛒 *Detalle del pedido:*
${itemsText}

💰 *Total a pagar:* ${formatted(totalPrice)}

${form.notas ? `📝 *Notas:* ${form.notas}` : ''}

_Pedido generado desde la web_`;

      const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

      // 3. Clear cart and open WhatsApp
      clearCart();
      closeCart();
      toast.success('¡Pedido registrado! Redirigiendo a WhatsApp...');
      setTimeout(() => window.open(waUrl, '_blank'), 800);
    } catch (err) {
      console.error(err);
      toast.error('Hubo un error al procesar tu pedido. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-campo-tierra/15">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-xl hover:bg-campo-tierra/15 flex items-center justify-center transition"
        >
          <ChevronLeft className="w-5 h-5 text-campo-oscuro/60" />
        </button>
        <div>
          <h3 className="font-bold text-campo-oscuro text-sm">Datos de Entrega</h3>
          <p className="text-xs text-campo-oscuro/50">Barranquilla, Colombia</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-campo-oscuro/60 uppercase tracking-wide mb-1.5">
            <User className="inline w-3 h-3 mr-1" />Nombre completo *
          </label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
            className="w-full bg-white border border-campo-tierra/20 rounded-2xl px-4 py-3 text-sm text-campo-oscuro placeholder-campo-oscuro/30 focus:outline-none focus:border-campo-verde focus:ring-2 focus:ring-campo-verde/15 transition"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-campo-oscuro/60 uppercase tracking-wide mb-1.5">
            <Phone className="inline w-3 h-3 mr-1" />Teléfono *
          </label>
          <input
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="3XX XXX XXXX"
            type="tel"
            className="w-full bg-white border border-campo-tierra/20 rounded-2xl px-4 py-3 text-sm text-campo-oscuro placeholder-campo-oscuro/30 focus:outline-none focus:border-campo-verde focus:ring-2 focus:ring-campo-verde/15 transition"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-campo-oscuro/60 uppercase tracking-wide mb-1.5">
            <Home className="inline w-3 h-3 mr-1" />Dirección *
          </label>
          <input
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
            placeholder="Calle / Carrera / Número"
            className="w-full bg-white border border-campo-tierra/20 rounded-2xl px-4 py-3 text-sm text-campo-oscuro placeholder-campo-oscuro/30 focus:outline-none focus:border-campo-verde focus:ring-2 focus:ring-campo-verde/15 transition"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-campo-oscuro/60 uppercase tracking-wide mb-1.5">
            <MapPin className="inline w-3 h-3 mr-1" />Barrio *
          </label>
          <select
            name="barrio"
            value={form.barrio}
            onChange={handleChange}
            className="w-full bg-white border border-campo-tierra/20 rounded-2xl px-4 py-3 text-sm text-campo-oscuro focus:outline-none focus:border-campo-verde focus:ring-2 focus:ring-campo-verde/15 transition appearance-none cursor-pointer"
            required
          >
            <option value="">Selecciona tu barrio</option>
            {BARRANQUILLA_BARRIOS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-campo-oscuro/60 uppercase tracking-wide mb-1.5">
            Notas adicionales
          </label>
          <textarea
            name="notas"
            value={form.notas}
            onChange={handleChange}
            placeholder="Indicaciones de entrega, portería, etc."
            rows={2}
            className="w-full bg-white border border-campo-tierra/20 rounded-2xl px-4 py-3 text-sm text-campo-oscuro placeholder-campo-oscuro/30 focus:outline-none focus:border-campo-verde focus:ring-2 focus:ring-campo-verde/15 transition resize-none"
          />
        </div>

        {/* Order summary */}
        <div className="bg-campo-verde/8 rounded-3xl p-4 space-y-2">
          <p className="text-xs font-bold text-campo-verde uppercase tracking-wide mb-2">Resumen del pedido</p>
          {items.map((i) => (
            <div key={i.id} className="flex justify-between text-xs text-campo-oscuro/70">
              <span>{i.nombre} x{i.quantity}</span>
              <span className="font-semibold text-campo-oscuro">
                {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(i.precio * i.quantity)}
              </span>
            </div>
          ))}
          <div className="flex justify-between pt-2 border-t border-campo-verde/20">
            <span className="text-sm font-bold text-campo-oscuro">Total</span>
            <span className="text-sm font-bold text-campo-tierra">
              {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(totalPrice)}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-2xl font-bold text-base hover:bg-[#1ebe5a] transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex gap-1">
              <span className="w-2 h-2 bg-white rounded-full animate-bounce-dot" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-white rounded-full animate-bounce-dot" style={{ animationDelay: '160ms' }} />
              <span className="w-2 h-2 bg-white rounded-full animate-bounce-dot" style={{ animationDelay: '320ms' }} />
            </span>
          ) : (
            <>
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Enviar Pedido por WhatsApp
            </>
          )}
        </button>
      </form>
    </div>
  );
}
