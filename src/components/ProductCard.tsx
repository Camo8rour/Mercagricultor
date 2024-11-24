import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { ShoppingCart, Edit, Trash2, Plus, Minus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useCartStore } from '../lib/store';

interface ProductCardProps extends Product {
  isSeller?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
}

export function ProductCard({
  id,
  name,
  price = 0,
  image,
  category,
  description = '',
  seller,
  availableKilos = 0,
  isSeller = false,
  onEdit,
  onDelete
}: ProductCardProps) {
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = React.useState(1);

  // Debugging
  React.useEffect(() => {
    console.log(`Product ${name} - Available Kilos:`, availableKilos);
  }, [name, availableKilos]);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(quantity + delta, availableKilos));
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    try {
      if (!id || !name || !price || !image || !category || !seller) {
        toast.error('Información del producto incompleta');
        return;
      }

      if (availableKilos <= 0) {
        toast.error('Producto agotado');
        return;
      }

      if (quantity > availableKilos) {
        toast.error('No hay suficiente cantidad disponible');
        return;
      }

      addItem(
        { id, name, price, image, category, seller, availableKilos, description },
        quantity
      );

      toast.success(`${quantity} kilo${quantity > 1 ? 's' : ''} de ${name} agregado al carrito`);
      setQuantity(1);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Error al agregar al carrito');
      }
    }
  };

  const isOutOfStock = availableKilos <= 0;
  const isLowStock = availableKilos > 0 && availableKilos <= 5;

  if (!id || !name || !price || !image || !category || !seller) {
    return null; // No renderizar si faltan datos esenciales
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-sm ${
        isOutOfStock ? 'opacity-75' : ''
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className={`w-full h-full object-cover ${isOutOfStock ? 'grayscale' : ''}`}
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
            {category}
          </span>
          {isOutOfStock && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm animate-pulse">
              Agotado
            </span>
          )}
          {isLowStock && !isOutOfStock && (
            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm animate-pulse">
              ¡Últimas unidades!
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{name}</h3>
        {description && (
          <p className="text-gray-600 text-sm mb-3 text-center">{description}</p>
        )}
        
        <div className="flex flex-col items-center gap-3 mb-4">
          <span className="text-2xl font-bold text-green-600">
            ${price.toFixed(2)} / Kilo
          </span>
          <div className={`px-4 py-2 rounded-full ${
            isOutOfStock ? 'bg-red-100' : isLowStock ? 'bg-yellow-100' : 'bg-green-100'
          }`}>
            <span className={`text-sm font-medium ${
              isOutOfStock ? 'text-red-700' : isLowStock ? 'text-yellow-700' : 'text-green-700'
            }`}>
              {isOutOfStock 
                ? 'Sin disponibilidad'
                : `${availableKilos.toFixed(1)} kilos disponibles`}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          {!isOutOfStock && !isSeller && (
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                <Minus className="w-5 h-5 text-gray-600" />
              </motion.button>
              <span className="text-lg font-semibold w-12 text-center">
                {quantity}
              </span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= availableKilos}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                <Plus className="w-5 h-5 text-gray-600" />
              </motion.button>
            </div>
          )}

          <div className="flex justify-center w-full">
            {isSeller ? (
              <div className="flex gap-2">
                {onEdit && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onEdit({ id, name, price, image, category, seller, availableKilos, description })}
                    className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </motion.button>
                )}
                {onDelete && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onDelete(id)}
                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                )}
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isOutOfStock
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                } text-white`}
              >
                <ShoppingCart className="w-5 h-5" />
                {isOutOfStock ? 'Agotado' : 'Agregar al Carrito'}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}