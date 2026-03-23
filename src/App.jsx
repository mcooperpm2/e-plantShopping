import React, { useState } from 'react';
import './App.css';
import AboutUs from './AboutUs';
import ProductList from './ProductList';
import CartItems from './CartItem';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const handleGetStarted = () => {
    setCurrentPage('products');
  };

  const handleGoHome = () => {
    setCurrentPage('landing');
  };

  const handleGoToCart = () => {
    setCurrentPage('cart');
  };

  const handleContinueShopping = () => {
    setCurrentPage('products');
  };

  return (
    <div className="app">
      {currentPage === 'landing' && (
        <AboutUs onGetStarted={handleGetStarted} />
      )}

      {currentPage === 'products' && (
        <ProductList onGoHome={handleGoHome} onGoToCart={handleGoToCart} />
      )}

      {currentPage === 'cart' && (
        <CartItems
          onContinueShopping={handleContinueShopping}
          onGoHome={handleGoHome}
        />
      )}
    </div>
  );
}

export default App;


