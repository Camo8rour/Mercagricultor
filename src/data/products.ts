import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Papas Orgánicas',
    price: 13000,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655',
    category: 'Tubérculos',
    seller: 'Granja el amanecer',
    availableKilos: 100,
    description: 'Papas orgánicas frescas cultivadas sin pesticidas'
  },
  {
    id: '2',
    name: 'Tomates Frescos',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea',
    category: 'Verduras',
    seller: 'Huerta Don José',
    availableKilos: 80,
    description: 'Tomates frescos y jugosos de cultivo local'
  },
  {
    id: '3',
    name: 'Aguacates Hass',
    price: 6300,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578',
    category: 'Frutas',
    seller: 'Finca los aguacates',
    availableKilos: 150,
    description: 'Aguacates Hass maduros y listos para consumir'
  },
  {
    id: '4',
    name: 'Zanahorias Orgánicas',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37',
    category: 'Verduras',
    seller: 'Granja orgánica',
    availableKilos: 120,
    description: 'Zanahorias orgánicas cultivadas sin químicos'
  },
  {
    id: '5',
    name: 'Manzanas Rojas',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6',
    category: 'Frutas',
    seller: 'Huerto familiar',
    availableKilos: 200,
    description: 'Manzanas rojas dulces y jugosas'
  },
  {
    id: '6',
    name: 'Cebollas',
    price: 7000,
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510',
    category: 'Verduras',
    seller: 'Granja el sol',
    availableKilos: 90,
    description: 'Cebollas frescas de primera calidad'
  }
];