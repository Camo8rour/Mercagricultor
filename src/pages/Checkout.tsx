import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useCartStore } from '../lib/store';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const checkoutSchema = z.object({
  name: z.string().min(2, 'El nombre es requerido'),
  email: z.string().email('Email inválido'),
  address: z.string().min(5, 'La dirección es requerida'),
  city: z.string().min(2, 'La ciudad es requerida'),
  cardNumber: z.string().regex(/^\d{16}$/, 'Número de tarjeta inválido'),
  expiry: z.string().regex(/^\d{2}\/\d{2}$/, 'Fecha de expiración inválida (MM/YY)'),
  cvv: z.string().regex(/^\d{3,4}$/, 'CVV inválido'),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export function Checkout() {
  const { items, clearCartAfterPurchase, getTotalPrice } = useCartStore();
  const total = getTotalPrice();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [processingStep, setProcessingStep] = React.useState('');
  const [hasStartedPayment, setHasStartedPayment] = React.useState(false);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  // Verificar si hay items en el carrito al inicio
  React.useEffect(() => {
    if (!hasStartedPayment && items.length === 0) {
      toast.error('Tu carrito está vacío');
      navigate('/products', { replace: true });
    }
  }, [items.length, navigate, hasStartedPayment]);

  // Si el usuario no está autenticado o no es comprador, redirigir
  if (!user || user.role !== 'buyer') {
    toast.error('Debes iniciar sesión como comprador');
    return <Navigate to="/login" replace />;
  }

  // Pre-llenar el formulario con la información del usuario
  React.useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email || '');
    }
  }, [user, setValue]);

  const onSubmit = async (data: CheckoutForm) => {
    try {
      setHasStartedPayment(true);
      setIsProcessing(true);
      
      // Paso 1: Validar información
      setProcessingStep('Validando información...');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Paso 2: Procesar pago
      setProcessingStep('Procesando pago...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Paso 3: Confirmar orden
      setProcessingStep('Confirmando orden...');
      
      // Guardar la orden en el historial (aquí podrías hacer una llamada a la API)
      const order = {
        items,
        total,
        shippingDetails: {
          name: data.name,
          email: data.email,
          address: data.address,
          city: data.city,
        },
        date: new Date().toISOString(),
      };
      
      console.log('Orden procesada:', order);
      
      // Paso 4: Finalizar proceso
      setProcessingStep('Finalizando...');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Limpiar el carrito y mostrar mensaje de éxito
      clearCartAfterPurchase();
      
      toast.success('¡Pago procesado exitosamente!', {
        duration: 5000,
        position: 'top-center',
      });

      // Navegar inmediatamente a la página de éxito
      navigate('/purchase-success', { 
        replace: true,
        state: { order }
      });
      
    } catch (error) {
      console.error('Error en el checkout:', error);
      toast.error('Error al procesar el pago. Por favor, intenta de nuevo.', {
        duration: 4000,
      });
    } finally {
      setIsProcessing(false);
      setProcessingStep('');
    }
  };

  return (
    <div className="container min-h-screen bg-[#FDF5E6] pt-24 pb-16 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-8 text-[#8B4513]">Verificar Compra</h2>

        {/* Resumen del carrito */}
        <div className="mb-8 bg-[#FDF5E6] p-4 rounded-lg">
          <h3 className="font-semibold mb-4 text-[#8B4513]">Resumen del Pedido</h3>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} (x{item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2 font-semibold flex justify-between">
              <span>Total</span>
              <span className="text-[#12bf26]">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                {...register('name')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12bf26] focus:ring-[#12bf26]"
                disabled={isProcessing}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                {...register('email')}
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12bf26] focus:ring-[#12bf26]"
                disabled={isProcessing}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Dirección</label>
            <input
              {...register('address')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12bf26] focus:ring-[#12bf26]"
              disabled={isProcessing}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Ciudad</label>
            <input
              {...register('city')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12bf26] focus:ring-[#12bf26]"
              disabled={isProcessing}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 text-[#8B4513]">Información de Pago</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Número de Tarjeta
                </label>
                <input
                  {...register('cardNumber')}
                  placeholder="1234 5678 9012 3456"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12bf26] focus:ring-[#12bf26]"
                  disabled={isProcessing}
                />
                {errors.cardNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.cardNumber.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Fecha de Expiración
                  </label>
                  <input
                    {...register('expiry')}
                    placeholder="MM/YY"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12bf26] focus:ring-[#12bf26]"
                    disabled={isProcessing}
                  />
                  {errors.expiry && (
                    <p className="mt-1 text-sm text-red-600">{errors.expiry.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">CVV</label>
                  <input
                    {...register('cvv')}
                    type="password"
                    placeholder="123"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12bf26] focus:ring-[#12bf26]"
                    disabled={isProcessing}
                  />
                  {errors.cvv && (
                    <p className="mt-1 text-sm text-red-600">{errors.cvv.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total a Pagar:</span>
              <span className="text-[#12bf26]">${total.toFixed(2)}</span>
            </div>
            
            {isProcessing && (
              <div className="text-center my-4">
                <p className="text-sm text-gray-600">{processingStep}</p>
              </div>
            )}
            
            <motion.button
              type="submit"
              disabled={isProcessing}
              whileHover={!isProcessing ? { scale: 1.02 } : {}}
              whileTap={!isProcessing ? { scale: 0.98 } : {}}
              className={`mt-6 w-full py-3 rounded-lg transition-colors flex items-center justify-center ${
                isProcessing 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-[#12bf26] hover:bg-[#0ea821]'
              } text-white`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Procesando...
                </>
              ) : (
                'Procesar Pago'
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}