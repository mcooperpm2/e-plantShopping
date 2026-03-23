import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function Header({ onGoHome, onContinueShopping, totalQuantity }) {
  return (
    <header className="app-header">
      <div className="brand-section" onClick={onGoHome} role="button" tabIndex={0}>
        <div className="brand-logo">🌿</div>
        <div>
          <h2>Paradise Nursery</h2>
          <p>Where Green Meets Serenity</p>
        </div>
      </div>

      <nav className="header-nav">
        <button className="nav-link" onClick={onContinueShopping}>
          Plants
        </button>
        <button className="nav-link">
          Cart
          <span className="cart-count">{totalQuantity}</span>
        </button>
      </nav>
    </header>
  );
}

function CartItems({ onContinueShopping, onGoHome }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateTotalAmount = () => {
    let total = 0;

    cart.forEach((item) => {
      const itemCost = parseFloat(item.cost.substring(1));
      total += itemCost * item.quantity;
    });

    return total;
  };

  const calculateTotalCost = (item) => {
    return (parseFloat(item.cost.substring(1)) * item.quantity).toFixed(2);
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="page-shell">
      <Header
        onGoHome={onGoHome}
        onContinueShopping={handleContinueShopping}
        totalQuantity={calculateTotalQuantity()}
      />

      <main className="cart-page">
        <div className="cart-summary">
          <h1>Total Cart Amount: ${calculateTotalAmount().toFixed(2)}</h1>
          <p>Total Plants in Cart: {calculateTotalQuantity()}</p>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <button className="continue-btn" onClick={handleContinueShopping}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {cart.map((item) => (
                <div className="cart-card" key={item.name}>
                  <img src={item.image} alt={item.name} className="cart-image" />

                  <div className="cart-details">
                    <h2>{item.name}</h2>
                    <p className="cart-price">{item.cost}</p>

                    <div className="quantity-controls">
                      <button onClick={() => handleDecrement(item)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleIncrement(item)}>+</button>
                    </div>

                    <p className="item-total">
                      Total: ${calculateTotalCost(item)}
                    </p>

                    <button
                      className="delete-btn"
                      onClick={() => handleRemove(item)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-actions">
              <button className="continue-btn" onClick={handleContinueShopping}>
                Continue Shopping
              </button>
              <button className="checkout-btn" onClick={handleCheckoutShopping}>
                Checkout
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default CartItems;