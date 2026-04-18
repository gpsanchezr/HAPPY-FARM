'use client';

import Image from "next/image";
import { useMemo, useState } from "react";
import CheckoutForm from "@/components/CheckoutForm";
import Invoice from "@/components/Invoice";
import { Cliente, ProductKey, PedidoConfirmado, StockData, useInventory } from "@/components/InventoryProvider";

export default function CatalogSection() {
  const { stock, cart, addToCart, confirmOrder } = useInventory();
  const [showCheckout, setShowCheckout] = useState(false);
  const [invoice, setInvoice] = useState<PedidoConfirmado | null>(null);

  const products = [
    {
      id: 1,
      name: "Queso Campesino",
      image: "/queso.jpg",
      key: "queso" as ProductKey,
    },
    {
      id: 2,
      name: "Suero Costeño",
      image: "/suero.jpg",
      key: "suero" as ProductKey,
    },
  ];

  const carrito = useMemo(() => {
    if (!stock) return [];
    return (Object.keys(cart) as ProductKey[])
      .filter((k) => cart[k] > 0)
      .map((k) => ({ producto: k, cantidad: cart[k], precio: stock[k].precio }));
  }, [cart, stock]);

  const total = useMemo(() => {
    return carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  }, [carrito]);

  const handleConfirm = (cliente: Cliente) => {
    const pedidoConfirmado = confirmOrder(cliente);
    if (pedidoConfirmado) {
      // Mostrar factura visual inmediatamente
      setInvoice(pedidoConfirmado);
      setShowCheckout(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Catálogo de Productos Especiales
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nuestros productos más solicitados, seleccionados con cuidado para tu deleite.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {products.map((product) => {
            const productStock = stock ? stock[product.key] : null;
            const isOutOfStock = !productStock || productStock.stock === 0;

            return (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {/* Product Image */}
                <div className="relative h-80 bg-gray-100 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover hover:scale-105 transition duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>

                  {productStock && (
                    <>
                      <p className="text-3xl font-bold text-primary-600 mb-2">
                        ${productStock.precio.toLocaleString()}
                        <span className="text-sm text-gray-500 font-normal"> / unidad</span>
                      </p>

                      <div className="mb-6">
                        {isOutOfStock ? (
                          <p className="text-lg font-bold text-gray-900">AGOTADO</p>
                        ) : (
                          <p className="text-lg text-gray-600">Disponible: {productStock.stock}</p>
                        )}
                      </div>
                    </>
                  )}

                  <button
                    onClick={() => addToCart(product.key)}
                    disabled={isOutOfStock}
                    className={`w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition duration-300 transform hover:scale-105 ${
                      isOutOfStock ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Agregar al pedido
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {carrito.length > 0 && (
          <div className="max-w-4xl mx-auto mt-10">
            <button
              onClick={() => setShowCheckout(true)}
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition duration-300"
            >
              Confirmar pedido (${total.toLocaleString()})
            </button>
          </div>
        )}

        {showCheckout && (
          <CheckoutForm
            carrito={carrito}
            onCancel={() => setShowCheckout(false)}
            onConfirm={handleConfirm}
          />
        )}

        {invoice && (
          <Invoice
            pedido={invoice}
            stock={stock as StockData}
            onClose={() => setInvoice(null)}
          />
        )}
      </div>
    </section>
  );
}
