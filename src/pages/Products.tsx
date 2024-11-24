import React from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '../components/ProductCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { useProductStore, useAuthStore } from '../lib/store';
import { Category } from '../types';
import { Plus } from 'lucide-react';

const categories: Category[] = ['Todos', 'Frutas', 'Verduras', 'Tubérculos'];

export function Products() {
  const [selectedCategory, setSelectedCategory] = React.useState<Category>('Todos');
  const products = useProductStore((state) => state.products);
  const user = useAuthStore((state) => state.user);
  const initializeProducts = useProductStore((state) => state.initializeProducts);

  // Inicializar productos solo si no hay ninguno
  React.useEffect(() => {
    initializeProducts();
  }, [initializeProducts]);

  // Debugging
  React.useEffect(() => {
    console.log('Products:', products);
    console.log('Selected Category:', selectedCategory);
    console.log('User:', user);
  }, [products, selectedCategory, user]);

  const filteredProducts = React.useMemo(() => 
    products.filter(product => 
      selectedCategory === 'Todos' || product.category === selectedCategory
    ),
    [selectedCategory, products]
  );

  return (
    <div className="container min-h-screen bg-[#FDF5E6] pt-24 pb-16 px-5">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-[#333] mb-3 font-['Arial']">
            {user?.role === 'seller' ? 'Gestiona tus Productos' : 'Nuestros Productos Frescos'}
          </h1>
          <p className="text-lg text-[#666] mb-8">
            {user?.role === 'seller' 
              ? 'Administra tu inventario de productos agrícolas'
              : 'Descubre la mejor selección de productos agrícolas directamente de nuestros agricultores'
            }
          </p>
        </motion.div>

        <div className="flex justify-between items-center mb-8">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          {user?.role === 'seller' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#12bf26] text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-[#0f9e1f] transition-colors"
              onClick={() => {/* TODO: Implementar modal de agregar producto */}}
            >
              <Plus size={20} />
              <span>Agregar Producto</span>
            </motion.button>
          )}
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard 
                key={product.id}
                {...product}
                isSeller={user?.role === 'seller'}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No hay productos disponibles en esta categoría
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}