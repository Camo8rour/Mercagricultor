import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Pencil, Trash2 } from 'lucide-react';
import { useProductStore, useAuthStore } from '../lib/store';
import { Navigate } from 'react-router-dom';
import { Product, Category } from '../types';

// Definir el tipo de categoría excluyendo 'Todos'
type ProductCategory = Exclude<Category, 'Todos'>;

const productSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  price: z.number().min(0.01, 'El precio debe ser mayor a 0'),
  category: z.enum(['Frutas', 'Verduras', 'Tubérculos']),
  image: z.string().url('Debe ser una URL válida'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  availableKilos: z.number().min(0.1, 'La cantidad debe ser mayor a 0'),
});

type ProductFormData = z.infer<typeof productSchema>;

const defaultValues: Partial<ProductFormData> = {
  price: 0,
  availableKilos: 0,
  category: 'Frutas',
};

export function SellerDashboard() {
  const user = useAuthStore((state) => state.user);
  const products = useProductStore((state) => state.products);
  const updateProduct = useProductStore((state) => state.updateProduct);
  const removeProduct = useProductStore((state) => state.removeProduct);
  const addProduct = useProductStore((state) => state.addProduct);
  const [editingProduct, setEditingProduct] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  // Redirigir si no es vendedor
  if (!user || user.role !== 'seller') {
    return <Navigate to="/" replace />;
  }

  // Filtrar productos del vendedor
  const sellerProducts = products.filter(
    (product) => product.seller === user.name
  );

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (!user) throw new Error('Debes iniciar sesión');

      const productData: Product = {
        ...data,
        id: editingProduct || Date.now().toString(),
        seller: user.name,
      };

      if (editingProduct) {
        updateProduct(editingProduct, productData);
        toast.success('Producto actualizado exitosamente');
      } else {
        addProduct(productData);
        toast.success('Producto agregado exitosamente');
      }

      reset(defaultValues);
      setEditingProduct(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al procesar el producto');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product.id);
    // Actualizar cada campo individualmente
    Object.entries(product).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'seller') {
        setValue(key as keyof ProductFormData, value);
      }
    });
  };

  const handleDelete = (productId: string) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        removeProduct(productId);
        toast.success('Producto eliminado exitosamente');
      } catch (error) {
        toast.error('Error al eliminar el producto');
      }
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
    reset(defaultValues);
  };

  const categories: ProductCategory[] = ['Frutas', 'Verduras', 'Tubérculos'];

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
            Panel de Control del Vendedor
          </h1>
          <p className="text-lg text-[#666]">
            Gestiona tus productos y monitorea tu inventario
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6">
              {editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  {...register('name')}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Ej: Manzanas Rojas"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Precio por Kilo
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('price', { valueAsNumber: true })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Ej: 2.50"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Categoría
                </label>
                <select
                  {...register('category')}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  URL de imagen
                </label>
                <input
                  type="url"
                  {...register('image')}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
                {errors.image && (
                  <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  {...register('description')}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  rows={3}
                  placeholder="Describe tu producto..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Kilos Disponibles
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register('availableKilos', { valueAsNumber: true })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Ej: 100"
                />
                {errors.availableKilos && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.availableKilos.message}
                  </p>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  {editingProduct ? 'Actualizar Producto' : 'Agregar Producto'}
                </button>
                {editingProduct && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </motion.div>

          {/* Lista de Productos */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6">Mis Productos</h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {sellerProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-grow">
                    <h4 className="font-semibold">{product.name}</h4>
                    <p className="text-sm text-gray-600">
                      ${product.price.toFixed(2)}/kg - {product.availableKilos.toFixed(1)} kg disponibles
                    </p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEdit(product)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                    >
                      <Pencil className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
              {sellerProducts.length === 0 && (
                <p className="text-center text-gray-500">
                  No tienes productos agregados aún.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}