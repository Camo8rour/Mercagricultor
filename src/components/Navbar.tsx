import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ShoppingCart, BarChart3, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useCartStore } from '../lib/store';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const cartItems = useCartStore((state) => state.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 ${
        scrolled ? 'scrolled-nav' : 'bg-[#12bf26]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <img 
              src="/favicon.ico" 
              alt="Mercagricultor Logo" 
              className="h-12 w-12 mr-2"
            />
            <Link to="/" className="flex items-center space-x-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Sprout className="h-8 w-8 text-[#8B4513]" />
              </motion.div>
              <span className="font-bold text-2xl text-[#8B4513]">Mercagricultor</span>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <motion.div
              whileHover={{ color: "#8B4513" }}
              initial={{ color: "#FFFFFF" }}
            >
              <Link 
                to="/" 
                className="px-3 py-2"
              >
                Inicio
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ color: "#8B4513" }}
              initial={{ color: "#FFFFFF" }}
            >
              <Link 
                to="/products" 
                className="px-3 py-2"
              >
                Productos
              </Link>
            </motion.div>

            {user ? (
              <div className="flex items-center space-x-4">
                {user.role === 'buyer' && (
                  <motion.div 
                    whileHover={{ scale: 1.1, color: "#8B4513" }}
                    initial={{ color: "#FFFFFF" }}
                  >
                    <Link 
                      to="/cart" 
                      className="p-2 inline-block relative"
                    >
                      <ShoppingCart className="h-6 w-6" />
                      {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#8B4513] text-white rounded-full px-2 py-1 text-xs">
                          {totalItems}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                )}

                {user.role === 'seller' && (
                  <>
                    <motion.div
                      whileHover={{ color: "#8B4513" }}
                      initial={{ color: "#FFFFFF" }}
                    >
                      <Link 
                        to="/seller/dashboard" 
                        className="px-3 py-2"
                      >
                        Panel
                      </Link>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.1, color: "#8B4513" }}
                      initial={{ color: "#FFFFFF" }}
                    >
                      <Link 
                        to="/sales-analysis" 
                        className="p-2 inline-block"
                      >
                        <BarChart3 className="h-6 w-6" />
                      </Link>
                    </motion.div>
                  </>
                )}

                <motion.div 
                  whileHover={{ scale: 1.05, color: "#8B4513" }}
                  initial={{ color: "#FFFFFF" }}
                  className="flex items-center space-x-2 px-3 py-2"
                >
                  <User className="h-6 w-6" />
                  <span>{user.name}</span>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05, color: "#8B4513" }}
                  initial={{ color: "#FFFFFF" }}
                  className="px-3 py-2 cursor-pointer"
                  onClick={logout}
                >
                  Cerrar Sesión
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ color: "#8B4513" }}
                  initial={{ color: "#FFFFFF" }}
                >
                  <Link 
                    to="/login"
                    className="px-3 py-2"
                  >
                    Iniciar Sesión
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ backgroundColor: "#8B4513", color: "#FFFFFF" }}
                  initial={{ backgroundColor: "#FFFFFF", color: "#12bf26" }}
                  className="px-4 py-2 rounded-lg"
                >
                  <Link to="/register">
                    Registrarse
                  </Link>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}