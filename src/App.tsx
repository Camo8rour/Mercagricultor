import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { PurchaseSuccess } from './pages/PurchaseSuccess';
import { SellerDashboard } from './pages/SellerDashboard';
import { SalesAnalysis } from './pages/SalesAnalysis';
import { ProtectedRoute } from './components/ProtectedRoute';
import { GachetaProducts } from './pages/GachetaProducts';
import { AboutUs } from './pages/AboutUs';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#FDF5E6] flex flex-col">
        <Navbar />
        <Toaster position="top-center" />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/gacheta-products" element={<GachetaProducts />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route
              path="/cart"
              element={
                <ProtectedRoute allowedRoles={['buyer']}>
                  <Cart />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/checkout"
              element={
                <ProtectedRoute allowedRoles={['buyer']}>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/purchase-success"
              element={
                <ProtectedRoute allowedRoles={['buyer']}>
                  <PurchaseSuccess />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/seller/dashboard"
              element={
                <ProtectedRoute allowedRoles={['seller']}>
                  <SellerDashboard />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/sales-analysis"
              element={
                <ProtectedRoute allowedRoles={['seller']}>
                  <SalesAnalysis />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;