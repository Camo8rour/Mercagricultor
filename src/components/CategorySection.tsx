import React from 'react';
import { motion } from 'framer-motion';

interface CategorySectionProps {
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
}

export function CategorySection({ title, description, image, reverse = false }: CategorySectionProps) {
  return (
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 py-16`}>
      <motion.div
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex-1"
      >
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: reverse ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex-1 text-center md:text-left"
      >
        <h2 className="text-3xl font-bold text-[#8B4513] mb-4">{title}</h2>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </motion.div>
    </div>
  );
}