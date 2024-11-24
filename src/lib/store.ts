import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, User, CartItem } from '../types';
import { products as initialProducts } from '../data/products';

interface ProductStore {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  getProduct: (productId: string) => Product | undefined;
  updateAvailableKilos: (productId: string, kilos: number) => void;
  initializeProducts: () => void;
  persistedProducts: Product[];
  setPersistedProducts: (products: Product[]) => void;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  clearCartAfterPurchase: () => void;
  getTotalPrice: () => number;
}

interface AuthStore {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      persistedProducts: initialProducts,
      setPersistedProducts: (products) => {
        set({ persistedProducts: products, products });
      },
      addProduct: (product) =>
        set((state) => {
          const newProducts = [...state.products, product];
          return {
            products: newProducts,
            persistedProducts: newProducts,
          };
        }),
      removeProduct: (productId) =>
        set((state) => {
          const newProducts = state.products.filter((p) => p.id !== productId);
          return {
            products: newProducts,
            persistedProducts: newProducts,
          };
        }),
      updateProduct: (productId, updates) =>
        set((state) => {
          const newProducts = state.products.map((p) =>
            p.id === productId ? { ...p, ...updates } : p
          );
          return {
            products: newProducts,
            persistedProducts: newProducts,
          };
        }),
      getProduct: (productId) => get().products.find((p) => p.id === productId),
      updateAvailableKilos: (productId, kilos) => {
        set((state) => {
          const newProducts = state.products.map((p) =>
            p.id === productId ? { ...p, availableKilos: kilos } : p
          );
          return {
            products: newProducts,
            persistedProducts: newProducts,
          };
        });
      },
      initializeProducts: () => {
        // Solo inicializar si no hay productos persistidos
        set((state) => {
          if (state.persistedProducts.length > 0) {
            return { products: state.persistedProducts };
          }
          return { products: initialProducts, persistedProducts: initialProducts };
        });
      },
    }),
    {
      name: 'product-storage',
      onRehydrateStorage: (state) => {
        // Cuando se recarga la página, usar los productos persistidos
        if (state) {
          state.products = state.persistedProducts;
        }
        return (rehydratedState) => {
          if (rehydratedState) {
            rehydratedState.products = rehydratedState.persistedProducts;
          }
        };
      },
    }
  )
);

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity) => {
        const existingItem = get().items.find((item) => item.id === product.id);
        const availableKilos = product.availableKilos;

        if (existingItem) {
          const newQuantity = existingItem.quantity + quantity;
          
          if (newQuantity > availableKilos) {
            throw new Error(`Solo hay ${availableKilos} kilos disponibles`);
          }

          set((state) => ({
            items: state.items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: newQuantity }
                : item
            ),
          }));
        } else {
          if (quantity > availableKilos) {
            throw new Error(`Solo hay ${availableKilos} kilos disponibles`);
          }

          set((state) => ({
            items: [
              ...state.items,
              {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                seller: product.seller,
                quantity,
              },
            ],
          }));
        }

        // Actualizar los kilos disponibles en el producto
        const updatedKilos = availableKilos - quantity;
        useProductStore.getState().updateAvailableKilos(product.id, updatedKilos);
      },
      removeItem: (productId) => {
        const item = get().items.find((i) => i.id === productId);
        if (item) {
          const product = useProductStore.getState().getProduct(productId);
          if (product) {
            useProductStore.getState().updateAvailableKilos(
              productId,
              product.availableKilos + item.quantity
            );
          }
        }
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },
      updateQuantity: (productId, quantity) => {
        const currentItem = get().items.find((item) => item.id === productId);
        if (!currentItem) return;

        const product = useProductStore.getState().getProduct(productId);
        if (!product) return;

        const currentAvailable = product.availableKilos;
        const quantityDiff = quantity - currentItem.quantity;

        if (quantityDiff > 0 && quantityDiff > currentAvailable) {
          throw new Error(`Solo hay ${currentAvailable} kilos disponibles`);
        }

        useProductStore.getState().updateAvailableKilos(
          productId,
          currentAvailable - quantityDiff
        );

        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        }));
      },
      clearCart: () => {
        // Esta función restaura el stock y se usa cuando se cancela la compra
        const items = get().items;
        items.forEach((item) => {
          const product = useProductStore.getState().getProduct(item.id);
          if (product) {
            useProductStore.getState().updateAvailableKilos(
              item.id,
              product.availableKilos + item.quantity
            );
          }
        });
        set({ items: [] });
      },
      clearCartAfterPurchase: () => {
        // Solo limpia el carrito sin restaurar el stock, ya que la compra fue exitosa
        set({ items: [] });
      },
      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0);
      },
    }),
    {
      name: 'cart-storage',
      onRehydrateStorage: () => (state) => {
        // Cuando se recarga la página, mantener el carrito vacío
        // pero NO restaurar el stock
        if (state) {
          state.items = [];
        }
      },
    }
  )
);

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);