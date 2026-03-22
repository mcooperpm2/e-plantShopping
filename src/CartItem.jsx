import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeItem } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    let total = 0;

    cart.forEach((item) => {
      const itemCost = parseFloat(item.cost.substring(1));
      total += item.quantity * itemCost;
    });

    return total;
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
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const calculateTotalCost = (item) => {
    return item.quantity * parseFloat(item.cost.substring(1));
  };

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>

      {cart.map((item, index) => (
        <div className="cart-item" key={index}>
          <img className="cart-item-image" src={item.image} alt={item.name} />

          <div className="cart-item-details">
            <h3>{item.name}</h3>
            <p>{item.cost}</p>

            <div className="cart-buttons">
              <button
                className="quantity-btn"
                onClick={() => handleDecrement(item)}
              >
                -
              </button>

              <span className="item-quantity">{item.quantity}</span>

              <button
                className="quantity-btn"
                onClick={() => handleIncrement(item)}
              >
                +
              </button>
            </div>

            <p>Total: ${calculateTotalCost(item)}</p>

            <button
              className="delete-btn"
              onClick={() => handleRemove(item)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <div className="cart-actions">
        <button
          className="continue-shopping-btn"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>

        <button
          className="checkout-btn"
          onClick={handleCheckoutShopping}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;