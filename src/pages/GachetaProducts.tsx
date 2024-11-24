import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Product {
  name: string;
  description: string;
  image: string;
  funFacts: string[];
  cultivationArea?: string;
  benefits?: string[];
  usage?: string[];
}

const products: Product[] = [
  {
    name: 'Café',
    description: 'Café de alta calidad cultivado en las montañas de Gachetá, conocido por su sabor suave y aroma excepcional.',
    image: 'https://cdn.pixabay.com/photo/2016/04/12/11/19/coffee-1324126_1280.jpg',
    funFacts: [
      'El café de Gachetá se cultiva a una altura entre 1.700 y 2.000 metros sobre el nivel del mar',
      'La temperatura promedio de cultivo es de 18-21°C, ideal para el café arábigo',
      'Los caficultores locales mantienen técnicas tradicionales heredadas por generaciones'
    ],
    cultivationArea: 'Veredas de alto Gachetá y zonas montañosas del municipio',
    benefits: [
      'Rico en antioxidantes naturales',
      'Contribuye a la economía local',
      'Reconocido por su calidad en la región'
    ],
    usage: [
      'Preparación de café tradicional',
      'Bebidas especiales',
      'Postres y repostería'
    ]
  },
  {
    name: 'Maíz',
    description: 'Maíz fresco y nutritivo, cultivado de manera tradicional por agricultores locales.',
    image: 'https://static.wixstatic.com/media/6e85d5_6ebbe8cf784849eabed5d3b640bc99c7~mv2.jpg/v1/fill/w_520,h_470,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/6e85d5_6ebbe8cf784849eabed5d3b640bc99c7~mv2.jpg',
    funFacts: [
      'El maíz es uno de los cultivos ancestrales de la región',
      'Se cultivan variedades únicas adaptadas al clima local',
      'Es base de la gastronomía tradicional de Gachetá'
    ],
    cultivationArea: 'Zonas planas y laderas suaves del municipio',
    benefits: [
      'Alto contenido de fibra y vitaminas',
      'Versátil en la cocina',
      'Cultivo sostenible'
    ],
    usage: [
      'Arepas tradicionales',
      'Sopas y mazamorras',
      'Alimentación animal'
    ]
  },
  {
    name: 'Yuca',
    description: 'Yuca fresca y versátil, perfecta para diversas preparaciones culinarias.',
    image: 'https://media.istockphoto.com/id/1192869169/es/foto/objeto-%C3%BAnico-de-ra%C3%ADz-de-yuca-fresca-aislada-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=in0Sxi338yVb09vME1xLDVdyXgh6npJG6XPn45IsRZs=',
    funFacts: [
      'La yuca de Gachetá es conocida por su textura suave',
      'Se cultiva durante todo el año',
      'Es uno de los cultivos más resistentes a la sequía'
    ],
    cultivationArea: 'Zonas templadas y cálidas del municipio',
    benefits: [
      'Excelente fuente de carbohidratos',
      'Libre de gluten',
      'Alta durabilidad post-cosecha'
    ],
    usage: [
      'Cocida como acompañamiento',
      'Chips y snacks',
      'Harina de yuca'
    ]
  },
  {
    name: 'Arracacha',
    description: 'Tubérculo tradicional de la región, rico en nutrientes y de sabor único.',
    image: 'https://kosante.s3.us-east-2.amazonaws.com/users/3/HQnz9zeipNm3kPVAhFpfqdbo1pr8WsWEKhVDx8oUVnuLCxthA1.png',
    funFacts: [
      'La arracacha es un cultivo ancestral en la región',
      'Es rica en vitamina A y fibra',
      'Se utiliza en diversas preparaciones culinarias'
    ],
    cultivationArea: 'Zonas montañosas y templadas del municipio',
    benefits: [
      'Rico en nutrientes',
      'Versátil en la cocina',
      'Cultivo sostenible'
    ],
    usage: [
      'Preparaciones culinarias tradicionales',
      'Sopas y purés',
      'Acompañamiento'
    ]
  },
  {
    name: 'Papa',
    description: 'Variedades selectas de papa cultivadas en las tierras fértiles de Gachetá.',
    image: 'https://cdn.pixabay.com/photo/2016/08/11/08/43/potatoes-1585060_1280.jpg',
    funFacts: [
      'La papa es uno de los cultivos más antiguos de la región',
      'Se cultivan variedades únicas adaptadas al clima local',
      'Es base de la gastronomía tradicional de Gachetá'
    ],
    cultivationArea: 'Zonas planas y laderas suaves del municipio',
    benefits: [
      'Alto contenido de fibra y vitaminas',
      'Versátil en la cocina',
      'Cultivo sostenible'
    ],
    usage: [
      'Preparaciones culinarias tradicionales',
      'Purés y sopas',
      'Acompañamiento'
    ]
  },
  {
    name: 'Fríjol',
    description: 'Fríjoles de alta calidad, cultivados con técnicas tradicionales.',
    image: 'https://www.elespectador.com/resizer/ql5StZHQjNYScPryvPN5LIBavjk=/arc-anglerfish-arc2-prod-elespectador/public/WTJOGZCUOZA7DNKKD7GOIMOQCI.jpg',
    funFacts: [
      'El fríjol es uno de los cultivos más antiguos de la región',
      'Se cultivan variedades únicas adaptadas al clima local',
      'Es base de la gastronomía tradicional de Gachetá'
    ],
    cultivationArea: 'Zonas planas y laderas suaves del municipio',
    benefits: [
      'Alto contenido de proteínas y fibra',
      'Versátil en la cocina',
      'Cultivo sostenible'
    ],
    usage: [
      'Preparaciones culinarias tradicionales',
      'Sopas y purés',
      'Acompañamiento'
    ]
  },
  {
    name: 'Caña Panelera',
    description: 'Caña de azúcar para la producción de panela artesanal de alta calidad.',
    image: 'https://elpilon.com.co/wp-content/uploads/2017/02/CA%C3%91A.jpg',
    funFacts: [
      'La caña de azúcar es un cultivo ancestral en la región',
      'Se utiliza para la producción de panela artesanal',
      'Es un cultivo sostenible'
    ],
    cultivationArea: 'Zonas planas y laderas suaves del municipio',
    benefits: [
      'Rico en nutrientes',
      'Versátil en la cocina',
      'Cultivo sostenible'
    ],
    usage: [
      'Producción de panela artesanal',
      'Preparaciones culinarias tradicionales',
      'Acompañamiento'
    ]
  },
  {
    name: 'Mora',
    description: 'Moras frescas y dulces, perfectas para consumo directo o preparaciones.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgbHgIqbzTcYOE6ROkYpyVHnIf6qQiPivAKA&s',
    funFacts: [
      'La mora es un fruto silvestre en la región',
      'Es rica en vitamina C y antioxidantes',
      'Se utiliza en diversas preparaciones culinarias'
    ],
    cultivationArea: 'Zonas montañosas y templadas del municipio',
    benefits: [
      'Rico en nutrientes',
      'Versátil en la cocina',
      'Cultivo sostenible'
    ],
    usage: [
      'Consumo directo',
      'Preparaciones culinarias tradicionales',
      'Acompañamiento'
    ]
  },
  {
    name: 'Lulo',
    description: 'Lulo fresco ideal para jugos y preparaciones tradicionales.',
    image: 'https://caribbeanexotics.com.co/wp-content/uploads/2021/03/lulo-producto-caribbean-exotics.png',
    funFacts: [
      'El lulo es un fruto silvestre en la región',
      'Es rico en vitamina C y antioxidantes',
      'Se utiliza en diversas preparaciones culinarias'
    ],
    cultivationArea: 'Zonas montañosas y templadas del municipio',
    benefits: [
      'Rico en nutrientes',
      'Versátil en la cocina',
      'Cultivo sostenible'
    ],
    usage: [
      'Jugos y bebidas',
      'Preparaciones culinarias tradicionales',
      'Acompañamiento'
    ]
  },
  {
    name: 'Granadilla',
    description: 'Granadilla dulce y jugosa, rica en vitaminas y minerales.',
    image: 'https://tienda.comersano.co/56-large_default/granadilla-libra.jpg',
    funFacts: [
      'La granadilla es un fruto silvestre en la región',
      'Es rica en vitamina C y antioxidantes',
      'Se utiliza en diversas preparaciones culinarias'
    ],
    cultivationArea: 'Zonas montañosas y templadas del municipio',
    benefits: [
      'Rico en nutrientes',
      'Versátil en la cocina',
      'Cultivo sostenible'
    ],
    usage: [
      'Consumo directo',
      'Preparaciones culinarias tradicionales',
      'Acompañamiento'
    ]
  },
  {
    name: 'Alverja',
    description: 'Alverja fresca cultivada en las fértiles tierras de Gachetá.',
    image: 'https://cdn.colombia.com/gastronomia/2019/08/22/arveja-G-6580-0.jpg',
    funFacts: [
      'La alverja es un cultivo ancestral en la región',
      'Es rica en proteínas y fibra',
      'Se utiliza en diversas preparaciones culinarias'
    ],
    cultivationArea: 'Zonas planas y laderas suaves del municipio',
    benefits: [
      'Rico en nutrientes',
      'Versátil en la cocina',
      'Cultivo sostenible'
    ],
    usage: [
      'Preparaciones culinarias tradicionales',
      'Sopas y purés',
      'Acompañamiento'
    ]
  },
  {
    name: 'Habas',
    description: 'Habas frescas y nutritivas, cultivadas de manera sostenible.',
    image: 'https://www.lavanguardia.com/files/image_948_465/uploads/2019/01/29/5e997ea9bc34d.jpeg',
    funFacts: [
      'La haba es un cultivo ancestral en la región',
      'Es rica en proteínas y fibra',
      'Se utiliza en diversas preparaciones culinarias'
    ],
    cultivationArea: 'Zonas planas y laderas suaves del municipio',
    benefits: [
      'Rico en nutrientes',
      'Versátil en la cocina',
      'Cultivo sostenible'
    ],
    usage: [
      'Preparaciones culinarias tradicionales',
      'Sopas y purés',
      'Acompañamiento'
    ]
  },
  {
    name: 'Tomate de Árbol',
    description: 'Tomate de árbol dulce y aromático, ideal para jugos y postres.',
    image: 'https://www.semana.com/resizer/v2/WSC25J6EEVEEJJ27FGKISDJNK4.jpg?auth=4a6ddbe233c89d6fbafdbdd2485a8173f55ac88067f376dc459af3d2bba8c4c0&smart=true&quality=75&width=1280&fitfill=false',
    funFacts: [
      'El tomate de árbol es un fruto silvestre en la región',
      'Es rico en vitamina C y antioxidantes',
      'Se utiliza en diversas preparaciones culinarias'
    ],
    cultivationArea: 'Zonas montañosas y templadas del municipio',
    benefits: [
      'Rico en nutrientes',
      'Versátil en la cocina',
      'Cultivo sostenible'
    ],
    usage: [
      'Jugos y bebidas',
      'Preparaciones culinarias tradicionales',
      'Acompañamiento'
    ]
  },
  {
    name: 'Tomate de Guiso',
    description: 'Tomates frescos y jugosos para tus preparaciones culinarias.',
    image: 'https://cdn.pixabay.com/photo/2016/08/01/17/08/tomatoes-1561565_1280.jpg',
    funFacts: [
      'El tomate de guiso es un cultivo ancestral en la región',
      'Es rico en vitamina C y antioxidantes',
      'Se utiliza en diversas preparaciones culinarias'
    ],
    cultivationArea: 'Zonas planas y laderas suaves del municipio',
    benefits: [
      'Rico en nutrientes',
      'Versátil en la cocina',
      'Cultivo sostenible'
    ],
    usage: [
      'Preparaciones culinarias tradicionales',
      'Sopas y purés',
      'Acompañamiento'
    ]
  },
  {
    name: 'Gulupa',
    description: 'Gulupa fresca y aromática, rica en antioxidantes.',
    image: 'https://frutand.com/wp-content/uploads/2022/09/pngwing.com-24-833x1024.png',
    funFacts: [
      'La gulupa es un fruto silvestre en la región',
      'Es rica en vitamina C y antioxidantes',
      'Se utiliza en diversas preparaciones culinarias'
    ],
    cultivationArea: 'Zonas montañosas y templadas del municipio',
    benefits: [
      'Rico en nutrientes',
      'Versátil en la cocina',
      'Cultivo sostenible'
    ],
    usage: [
      'Consumo directo',
      'Preparaciones culinarias tradicionales',
      'Acompañamiento'
    ]
  },
  {
    name: 'Pimentón',
    description: 'Pimentones frescos y coloridos, cultivados con amor en Gachetá.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2ByvxBGmQW_shxWMrRBrmVRMIHeT5v4rl9A&s',
    funFacts: [
      'El pimentón es un cultivo ancestral en la región',
      'Es rico en vitamina C y antioxidantes',
      'Se utiliza en diversas preparaciones culinarias'
    ],
    cultivationArea: 'Zonas planas y laderas suaves del municipio',
    benefits: [
      'Rico en nutrientes',
      'Versátil en la cocina',
      'Cultivo sostenible'
    ],
    usage: [
      'Preparaciones culinarias tradicionales',
      'Sopas y purés',
      'Acompañamiento'
    ]
  }
];

export function GachetaProducts() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF5E6] to-[#F5DEB3] pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-[#8B4513] mb-6 font-serif">
            Productos de Gachetá
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Descubre la rica variedad de productos agrícolas cultivados en nuestro municipio, 
            donde la tradición y la calidad se unen para ofrecer lo mejor de nuestra tierra.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300 z-10"/>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 z-20">
                  <h3 className="text-2xl font-bold text-white mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {product.name}
                  </h3>
                </div>
              </div>
              <div className="p-6 bg-white">
                <div className="h-24 overflow-auto">
                  <p className="text-gray-600 text-center leading-relaxed">
                    {product.description}
                  </p>
                </div>
                <motion.div 
                  className="mt-4 flex justify-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className="px-6 py-2 bg-[#12bf26] text-white rounded-full hover:bg-[#0ea821] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#12bf26] focus:ring-offset-2"
                  >
                    Ver Detalles
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal de Detalles */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-bold text-[#8B4513]">{selectedProduct.name}</h2>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                <div className="aspect-video mb-6 rounded-xl overflow-hidden">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-[#8B4513] mb-3">Datos Curiosos</h3>
                    <ul className="space-y-2">
                      {selectedProduct.funFacts.map((fact, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="w-2 h-2 bg-[#12bf26] rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-700">{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {selectedProduct.cultivationArea && (
                    <div>
                      <h3 className="text-xl font-semibold text-[#8B4513] mb-3">Zona de Cultivo</h3>
                      <p className="text-gray-700">{selectedProduct.cultivationArea}</p>
                    </div>
                  )}

                  {selectedProduct.benefits && (
                    <div>
                      <h3 className="text-xl font-semibold text-[#8B4513] mb-3">Beneficios</h3>
                      <ul className="space-y-2">
                        {selectedProduct.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="w-2 h-2 bg-[#12bf26] rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedProduct.usage && (
                    <div>
                      <h3 className="text-xl font-semibold text-[#8B4513] mb-3">Usos Principales</h3>
                      <ul className="space-y-2">
                        {selectedProduct.usage.map((use, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="w-2 h-2 bg-[#12bf26] rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-700">{use}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
