'use client';

import React, { useMemo, useRef, useState, useEffect } from 'react';
import { PedidoConfirmado, StockData } from '@/components/InventoryProvider';

interface InvoiceProps {
  pedido: PedidoConfirmado;
  stock?: StockData | null;
  onClose: () => void;
}

export default function Invoice({ pedido, stock, onClose }: InvoiceProps) {
  const generatedId = useMemo(() => 'ORD-' + Math.random().toString(36).slice(2, 10).toUpperCase(), []);
  const purchaseId = pedido && (pedido.id ? pedido.id : generatedId);
  const dateStr = useMemo(() => new Date().toLocaleString(), []);

  const shipping = 0;
  const subtotal = pedido.total - shipping;

  const qrData = `id:${purchaseId};total:${pedido.total};cliente:${pedido.cliente.nombre}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(qrData)}`;

  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
    return () => setMounted(false);
  }, []);

  const handleDownload = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="presentation"
    >
      {/* Load Inter font (only once is ideal; this is a lightweight include) */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap"
        rel="stylesheet"
      />

      <div
        ref={cardRef}
        style={{ fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto" }}
        className={
          'bg-white rounded-2xl shadow-2xl max-w-xl w-full ring-1 ring-black/5 transform transition-all duration-300 ' +
          (mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95')
        }
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white font-extrabold shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4l3 8 4-16 3 8h4" />
                </svg>
              </div>
              <div>
                <div className="text-base font-semibold text-gray-900">Comprobante de compra</div>
                <div className="text-xs text-gray-500">Nación Campo Verde</div>
              </div>
            </div>

            <div className="text-right text-xs text-gray-600">
              <div>Transacción</div>
              <div className="text-sm font-mono font-semibold text-gray-900">{purchaseId}</div>
            </div>
          </div>
          <div className="mt-3 border-t border-gray-100" />

          <div className="mt-3 pt-3 grid grid-cols-2 gap-4">
            <div className="p-3 border rounded-md shadow-sm">
              <div className="text-xs text-gray-500">Estado</div>
              <div className="flex items-center gap-2 mt-1">
                <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-50 text-green-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <div className="text-sm font-medium text-green-700">Pago confirmado</div>
              </div>
            </div>

            <div className="p-3 border rounded-md shadow-sm text-sm text-gray-600">
              <div className="text-xs text-gray-500">Fecha</div>
              <div className="font-medium text-gray-900 mt-1">{dateStr}</div>
              <div className="text-xs text-gray-500 mt-2">Método</div>
              <div className="font-medium text-gray-900">Pago en línea</div>
            </div>

            <div className="col-span-2 p-3 border rounded-md shadow-sm">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-xs text-gray-500">Cliente</div>
                  <div className="text-sm font-medium text-gray-900">{pedido.cliente.nombre}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Dirección</div>
                  <div className="text-sm text-gray-900">{pedido.cliente.direccion}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Items and QR */}
          <div className="mt-4">
            <div className="text-sm text-gray-600 font-medium mb-2">Detalle de compra</div>
            <div className="overflow-x-auto">
              <div className="min-w-full border rounded-md shadow-sm">
                <div className="grid grid-cols-12 gap-2 bg-gray-50 p-3 text-xs text-gray-600 font-semibold">
                  <div className="col-span-6">Producto</div>
                  <div className="col-span-3 text-center">Cantidad</div>
                  <div className="col-span-3 text-right">Precio</div>
                </div>
                <div className="p-3">
                  {pedido.pedido.map((item) => {
                    const name = item.producto.charAt(0).toUpperCase() + item.producto.slice(1);
                    const unit = stock ? stock[item.producto].precio : 0;
                    const lineTotal = unit * item.cantidad;
                    return (
                      <div key={item.producto} className="grid grid-cols-12 gap-2 items-center py-2 border-b last:border-b-0">
                        <div className="col-span-6 text-sm text-gray-900">{name}</div>
                        <div className="col-span-3 text-center text-sm text-gray-700">{item.cantidad}</div>
                        <div className="col-span-3 text-right text-sm font-medium text-gray-900">${lineTotal.toLocaleString()}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Totals and QR */}
          <div className="mt-6 border-t border-gray-100 pt-4">
            <div className="grid grid-cols-3 gap-4 items-center">
              <div className="col-span-1 flex items-center">
                <img src={qrUrl} alt="QR transacción" className="w-32 h-32 rounded-md border" />
              </div>

              <div className="col-span-2">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Envío</span>
                  <span>${shipping.toLocaleString()}</span>
                </div>

                <div className="mt-3 p-3 rounded-lg border bg-white shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500">Estado</div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Pago confirmado
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Total</div>
                    <div className="text-4xl font-extrabold text-green-700">${pedido.total.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div className="text-sm text-gray-600">Gracias por tu compra</div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  try {
                    const number = '573138486878';
                    const productLines = pedido.pedido
                      .map((it) => `Producto: ${it.producto}\nCantidad: ${it.cantidad}`)
                      .join('\n\n');

                    const message = `🛒 Nuevo pedido\n\nPedido: ${purchaseId}\nCliente: ${pedido.cliente.nombre}\nDirección: ${pedido.cliente.direccion}\n\n${productLines}\n\nTotal: $${pedido.total}`;

                    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
                    window.open(url, '_blank');
                  } catch (e) {
                    console.error('Error opening WhatsApp', e);
                  }
                }}
                className="px-4 py-2 bg-[#25D366] text-white rounded-lg font-semibold hover:brightness-95"
              >
                Enviar pedido por WhatsApp
              </button>

              <button onClick={handleDownload} className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">
                Descargar factura
              </button>
              <button onClick={onClose} className="px-4 py-2 bg-black text-white rounded-lg font-semibold hover:opacity-95">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
