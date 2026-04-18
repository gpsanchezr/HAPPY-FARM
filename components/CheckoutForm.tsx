'use client';

import { useState } from 'react';

interface Cliente {
  nombre: string;
  telefono: string;
  direccion: string;
  notas?: string;
}

interface ProductoCarrito {
  producto: string;
  cantidad: number;
  precio: number;
}

interface CheckoutFormProps {
  carrito: ProductoCarrito[];
  onConfirm: (cliente: Cliente) => void;
  onCancel: () => void;
}

export default function CheckoutForm({ carrito, onConfirm, onCancel }: CheckoutFormProps) {
  const [cliente, setCliente] = useState<Cliente>({
    nombre: '',
    telefono: '',
    direccion: '',
    notas: '',
  });
  const [errores, setErrores] = useState<{ [key: string]: string }>({});

  const validarFormulario = () => {
    const nuevosErrores: { [key: string]: string } = {};

    if (!cliente.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    }

    if (!cliente.telefono.trim()) {
      nuevosErrores.telefono = 'El teléfono es obligatorio';
    } else if (!/^\d+$/.test(cliente.telefono)) {
      nuevosErrores.telefono = 'El teléfono debe contener solo números';
    }

    if (!cliente.direccion.trim()) {
      nuevosErrores.direccion = 'La dirección es obligatoria';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validarFormulario()) {
      onConfirm(cliente);
    }
  };

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-y-auto p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Confirmar Pedido</h2>

        {/* Resumen del Pedido */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Resumen del Pedido:</h3>
          {carrito.map((item) => (
            <div key={item.producto} className="text-sm text-gray-600 flex justify-between">
              <span>{item.producto.charAt(0).toUpperCase() + item.producto.slice(1)}</span>
              <span>x{item.cantidad} = ${(item.precio * item.cantidad).toLocaleString()}</span>
            </div>
          ))}
          <div className="border-t mt-2 pt-2 font-semibold text-gray-900 flex justify-between">
            <span>Total:</span>
            <span>${total.toLocaleString()}</span>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre Completo *
            </label>
            <input
              type="text"
              value={cliente.nombre}
              onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 ${
                errores.nombre ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Juan Pérez"
            />
            {errores.nombre && <p className="text-red-500 text-xs mt-1">{errores.nombre}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono *
            </label>
            <input
              type="tel"
              value={cliente.telefono}
              onChange={(e) => setCliente({ ...cliente, telefono: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 ${
                errores.telefono ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="3001234567"
            />
            {errores.telefono && <p className="text-red-500 text-xs mt-1">{errores.telefono}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dirección de Entrega *
            </label>
            <input
              type="text"
              value={cliente.direccion}
              onChange={(e) => setCliente({ ...cliente, direccion: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 ${
                errores.direccion ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Calle 10 #25"
            />
            {errores.direccion && <p className="text-red-500 text-xs mt-1">{errores.direccion}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notas Adicionales (Opcional)
            </label>
            <textarea
              value={cliente.notas || ''}
              onChange={(e) => setCliente({ ...cliente, notas: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
              placeholder="Indicaciones especiales..."
              rows={2}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 bg-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Confirmar Pedido
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
