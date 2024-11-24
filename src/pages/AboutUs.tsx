import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Duvan Camilo Rodriguez Urrego',
    role: 'Ingeniero de Sistemas',
    image: '/images/team/duvan.jpg'
  },
  {
    name: 'Jalil Danilo Aviles Pacheco',
    role: 'Ingeniero de Sistemas',
    image: '/images/team/jalil.jpg'
  },
  {
    name: 'Julio Cesar Perdomo Contreras',
    role: 'Ingeniero de Sistemas',
    image: '/images/team/julio.jpg'
  }
];

export function AboutUs() {
  return (
    <div className="min-h-screen bg-[#FDF5E6] pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Sección del Equipo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-3xl font-bold text-[#8B4513] mb-8 text-center">
              Nuestro Equipo
            </h2>
            <div className="space-y-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-center space-x-4 p-4 bg-[#FDF5E6] rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/150?text=' + encodeURIComponent(member.name.charAt(0));
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#8B4513]">{member.name}</h3>
                    <p className="text-gray-600 text-sm">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Sección de Encuesta */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-center items-center"
          >
            <h2 className="text-3xl font-bold text-[#8B4513] mb-6 text-center">
              Tu Opinión es Importante
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-md">
              Ayúdanos a mejorar completando nuestra encuesta de satisfacción. 
              Tu retroalimentación nos ayuda a crear una mejor experiencia para todos.
            </p>
            <motion.a
              href="https://forms.gle/r78TyT3MeGya2gC79"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-200 bg-[#12bf26] rounded-full hover:bg-[#0ea821] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#12bf26]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">Completar Encuesta</span>
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.a>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="mt-12 p-6 bg-[#FDF5E6] rounded-lg max-w-md"
            >
              <h3 className="text-xl font-semibold text-[#8B4513] mb-4">
                ¿Por qué participar?
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#12bf26] rounded-full mr-2"></span>
                  Ayudas a mejorar la plataforma
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#12bf26] rounded-full mr-2"></span>
                  Compartes tu experiencia
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#12bf26] rounded-full mr-2"></span>
                  Contribuyes al desarrollo local
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
