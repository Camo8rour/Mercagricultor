import React from 'react';
import { motion } from 'framer-motion';
import { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

export function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap justify-center gap-4 mb-12"
    >
      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectCategory(category)}
          className={`px-6 py-3 rounded-full transition-all duration-300 shadow-md ${
            selectedCategory === category
              ? 'bg-[#12bf26] text-white'
              : 'bg-white text-[#333] hover:bg-[#12bf26]/10'
          }`}
        >
          {category}
        </motion.button>
      ))}
    </motion.div>
  );
}