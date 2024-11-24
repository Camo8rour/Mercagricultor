import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowLeft } from 'lucide-react';

interface OrderDetails {
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  shippingDetails: {
    name: string;
    email: string;
    address: string;
    city: string;
  };
  date: string;
}

interface LocationState {
  order: OrderDetails;
}

export function PurchaseSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  // Si no hay información de la orden, redirigir al inicio
  if (!state?.order) {
    return <Navigate to="/" replace />;
  }

  const { order } = state;
  const formattedDate = new Date(order.date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="container min-h-screen bg-[#FDF5E6] pt-24 pb-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="inline-block"
          >
            <CheckCircle2 className="w-16 h-16 text-[#12bf26] mx-auto" />
          </motion.div>
          <h2 className="text-2xl font-bold mt-4 text-[#8B4513]">¡Compra Exitosa!</h2>
          <p className="text-gray-600 mt-2">
            Gracias por tu compra. Tu pedido ha sido procesado correctamente.
          </p>
        </div>

        <div className="bg-[#FDF5E6] p-6 rounded-lg mb-6">
          <h3 className="font-semibold mb-4 text-[#8B4513]">Detalles del Pedido</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Fecha de la compra:</p>
              <p className="font-medium">{formattedDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Enviar a:</p>
              <p className="font-medium">{order.shippingDetails.name}</p>
              <p className="font-medium">{order.shippingDetails.address}</p>
              <p className="font-medium">{order.shippingDetails.city}</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold mb-3 text-[#8B4513]">Productos Comprados</h4>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} (x{item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-[#12bf26]">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 w-full py-3 bg-[#8B4513] text-white rounded-lg hover:bg-[#704010] transition-colors flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver al Inicio
        </motion.button>
      </motion.div>
    </div>
  );
}
