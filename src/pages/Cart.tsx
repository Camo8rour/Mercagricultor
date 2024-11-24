import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../lib/store';
import { toast } from 'react-hot-toast';

export function Cart() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const total = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="container min-h-screen bg-[#FDF5E6] pt-24 pb-16 px-5">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#333] mb-6">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-8">¡Agrega algunos productos frescos a tu carrito!</p>
          <Link
            to="/products"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Continuar comprando
          </Link>
        </div>
      </div>
    );
  }

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    try {
      updateQuantity(itemId, newQuantity);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Error al actualizar la cantidad');
      }
    }
  };

  return (
    <div className="container min-h-screen bg-[#FDF5E6] pt-24 pb-16 px-5">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-3xl font-bold text-[#333] mb-8">Tu carrito</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-lg mb-4 shadow-lg"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)} / Kilo</p>
                  <p className="text-sm text-gray-500">Vendido por: {item.seller}</p>
                </div>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-5 h-5 text-gray-600" />
                  </motion.button>
                  <span className="w-12 text-center font-semibold">
                    {item.quantity}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                  >
                    <Plus className="w-5 h-5 text-gray-600" />
                  </motion.button>
                </div>
                <div className="text-center sm:text-right">
                  <p className="font-bold text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-600 p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg h-fit">
            <h3 className="text-xl font-bold mb-6">Resumen del pedido</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envío</span>
                <span className="text-green-600">Gratis</span>
              </div>
              <div className="border-t pt-4 font-bold text-lg flex justify-between">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/checkout"
                className="block w-full bg-green-600 text-white text-center py-4 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Proceder al pago
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}