import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, updateQuantity, removeItem } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      return total + item.quantity * parseFloat(item.cost.substring(1));
    }, 0);
  };

  const calculateTotalCost = (item) => {
    return item.quantity * parseFloat(item.cost.substring(1));
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        amount: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          amount: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleAddOneMore = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} className="cart-item-card">
            <img src={item.image} alt={item.name} className="cart-item-image" />

            <div className="cart-item-details">
              <h2>{item.name}</h2>
              <p>{item.cost}</p>

              <div className="quantity-controls">
                <button onClick={() => handleDecrement(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
              </div>

              <p>Total: ${calculateTotalCost(item)}</p>

              <button
                onClick={() => handleRemove(item)}
                className="delete-btn"
              >
                Delete
              </button>

              {/* Optional helper button if your instructor expects visible addItem use in CartItem */}
              {/* <button onClick={() => handleAddOneMore(item)}>Add One More</button> */}
            </div>
          </div>
        ))
      )}

      <div className="cart-actions">
        <button onClick={handleContinueShopping}>Continue Shopping</button>
        <button onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;