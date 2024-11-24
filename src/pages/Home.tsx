import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Shield, Truck, ShoppingBag, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CategorySection } from '../components/CategorySection';

export function Home() {
  return (
    <div className="min-h-screen bg-[#FDF5E6]">
      {/* Hero Section */}
      <div 
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-7xl mx-auto px-4 h-full flex items-center"
        >
          <div className="text-white">
            <h1 className="text-6xl font-bold mb-4">Del campo a tu mesa</h1>
            <p className="text-xl mb-8">Conecta directamente con agricultores locales y recibe los productos más frescos en tu puerta</p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/products"
                className="inline-flex items-center bg-[#8B4513] text-white px-8 py-4 rounded-lg hover:bg-[#A0522D] transition-colors"
              >
                Ver productos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#FDF5E6] p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center justify-center mb-4">
                <ShoppingBag className="h-12 w-12 text-[#12bf26]" />
              </div>
              <h3 className="text-xl font-semibold text-[#8B4513] text-center mb-2">
                Compra Directa
              </h3>
              <p className="text-gray-600 text-center">
                Adquiere productos frescos directamente de los agricultores
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#FDF5E6] p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="h-12 w-12 text-[#12bf26]" />
              </div>
              <h3 className="text-xl font-semibold text-[#8B4513] text-center mb-2">
                Precios Justos
              </h3>
              <p className="text-gray-600 text-center">
                Mejores precios para compradores y vendedores sin intermediarios
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#FDF5E6] p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center justify-center mb-4">
                <Users className="h-12 w-12 text-[#12bf26]" />
              </div>
              <h3 className="text-xl font-semibold text-[#8B4513] text-center mb-2">
                Comunidad
              </h3>
              <p className="text-gray-600 text-center">
                Únete a nuestra comunidad de agricultores y compradores
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <CategorySection
          title="Frutas Frescas"
          description="Descubre nuestra selección de frutas frescas, cultivadas con amor y cuidado por agricultores locales. Productos de temporada que llevan la dulzura natural directamente a tu hogar."
          image="https://images.unsplash.com/photo-1619566636858-adf3ef46400b"
        />
        <CategorySection
          title="Verduras Orgánicas"
          description="Verduras orgánicas certificadas, cultivadas sin pesticidas ni químicos dañinos. Sabor auténtico y nutrición garantizada en cada bocado."
          image="https://images.unsplash.com/photo-1590779033100-9f60a05a013d"
          reverse
        />
        <CategorySection
          title="Productos de la Tierra"
          description="Tubérculos y raíces frescas, cosechadas en el momento perfecto. La base de la cocina tradicional con la calidad que mereces."
          image="https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f"
        />
      </div>

      {/* Why Choose Us */}
      <div className="py-16 bg-[#DEB887]/20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-[#8B4513] mb-12"
          >
            ¿Por qué elegir Mercagricultor?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <div className="bg-[#8B4513]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-[#8B4513]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#8B4513]">Productos Frescos</h3>
              <p className="text-gray-600">Directo de agricultores locales, garantizando la mejor calidad y frescura</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-6"
            >
              <div className="bg-[#8B4513]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-[#8B4513]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#8B4513]">Plataforma Segura</h3>
              <p className="text-gray-600">Transacciones seguras con vendedores verificados</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center p-6"
            >
              <div className="bg-[#8B4513]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-[#8B4513]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#8B4513]">Entrega Rápida</h3>
              <p className="text-gray-600">Entrega rápida y confiable a tu ubicación</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center bg-[#FDF5E6] p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-[#8B4513] mb-4">
              ¿Eres agricultor?
            </h2>
            <p className="text-gray-700 mb-6">
              Únete a nuestra plataforma y vende tus productos directamente a los consumidores
            </p>
            <Link
              to="/register"
              className="inline-block bg-[#12bf26] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#0ea821] transition-colors"
            >
              Registrarse como Vendedor
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}