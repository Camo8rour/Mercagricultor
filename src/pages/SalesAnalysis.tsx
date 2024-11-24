import React from 'react';
import { motion } from 'framer-motion';
import { useProductStore, useAuthStore } from '../lib/store';
import { BarChart3, TrendingUp, DollarSign } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export function SalesAnalysis() {
  const user = useAuthStore((state) => state.user);
  const products = useProductStore((state) => state.products);

  // Redirigir si no es vendedor
  if (!user || user.role !== 'seller') {
    return <Navigate to="/" replace />;
  }

  // Filtrar productos del vendedor
  const sellerProducts = products.filter(
    (product) => product.seller === user.name
  );

  // Calcular estadísticas
  const totalProducts = sellerProducts.length;
  const totalKilos = sellerProducts.reduce((acc, product) => acc + product.availableKilos, 0);
  const totalValue = sellerProducts.reduce((acc, product) => acc + (product.price * product.availableKilos), 0);

  return (
    <div className="container min-h-screen bg-[#FDF5E6] pt-24 pb-16 px-5">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-[#333] mb-3">
            Análisis de Ventas
          </h1>
          <p className="text-lg text-[#666]">
            Resumen de tu inventario y productos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Total Productos</h3>
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">{totalProducts}</p>
            <p className="text-sm text-gray-500 mt-2">Productos en inventario</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Total Kilos</h3>
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600">{totalKilos.toFixed(1)}</p>
            <p className="text-sm text-gray-500 mt-2">Kilos disponibles</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Valor Total</h3>
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-600">${totalValue.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-2">Valor del inventario</p>
          </motion.div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Detalle de Productos</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio/Kg
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kilos Disponibles
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sellerProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={product.image}
                          alt={product.name}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.availableKilos.toFixed(1)} kg
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${(product.price * product.availableKilos).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
