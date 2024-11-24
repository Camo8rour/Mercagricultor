import React from 'react';
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="bg-[#901616]/75 text-black py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Sección Mercagricultor */}
          <div className="text-center md:text-left flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-black/20 w-fit">
              Mercagricultor
            </h3>
            <p className="text-base leading-relaxed max-w-xs mx-auto text-center font-medium">
              Conectando agricultores con consumidores para un comercio más justo y sostenible.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div className="text-center flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-black/20 w-fit">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-3">
              <li>
                <motion.a 
                  href="/about-us" 
                  className="hover:text-white transition-colors inline-block"
                  whileHover={{ scale: 1.05 }}
                >
                  Sobre Nosotros
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="/gacheta-products" 
                  className="hover:text-white transition-colors inline-block"
                  whileHover={{ scale: 1.05 }}
                >
                  Productos
                </motion.a>
              </li>
            </ul>
          </div>

          {/* Enlaces de Interés */}
          <div className="text-center flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 border-black/20 w-fit">
              Enlaces de Interés
            </h3>
            <ul className="space-y-3">
              <li>
                <motion.a
                  href="https://www.gacheta-cundinamarca.gov.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-block"
                  whileHover={{ scale: 1.05 }}
                >
                  Alcaldía de Gachetá
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="https://es.wikipedia.org/wiki/Gachet%C3%A1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-block"
                  whileHover={{ scale: 1.05 }}
                >
                  Información de Gachetá
                </motion.a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-black/20 text-center">
          <p className="text-sm">&copy; 2024 Mercagricultor. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}