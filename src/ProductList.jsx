import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';

const ProductList = ({ onCartClick }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const plantsArray = [
    {
      category: 'Aromatic Plants',
      plants: [
        {
          name: 'Lavender',
          image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400',
          description: 'Fragrant plant known for calming scent.',
          cost: '$20',
        },
        {
          name: 'Jasmine',
          image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400',
          description: 'Sweet-smelling flowering plant.',
          cost: '$18',
        },
      ],
    },
    {
      category: 'Medicinal Plants',
      plants: [
        {
          name: 'Aloe Vera',
          image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400',
          description: 'Popular medicinal succulent.',
          cost: '$15',
        },
        {
          name: 'Mint',
          image: 'https://images.unsplash.com/photo-1628557044797-f21a177c37ec?w=400',
          description: 'Refreshing herb used in teas and remedies.',
          cost: '$10',
        },
      ],
    },
    {
      category: 'Air Purifying Plants',
      plants: [
        {
          name: 'Spider Plant',
          image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400',
          description: 'Filters indoor air and is easy to grow.',
          cost: '$12',
        },
        {
          name: 'Snake Plant',
          image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=400',
          description: 'Produces oxygen and improves air quality.',
          cost: '$15',
        },
      ],
    },
  ];

  const isInCart = (plantName) => {
    return cartItems.some((item) => item.name === plantName);
  };

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  const calculateTotalQuantity = () => {
    return cartItems
      ? cartItems.reduce((total, item) => total + item.quantity, 0)
      : 0;
  };

  return (
    <div className="product-list-container">
      <div className="navbar">
        <div className="brand">
          <h3>Paradise Nursery</h3>
          <p>Where Green Meets Serenity</p>
        </div>

        <div className="nav-center">
          <h3>Plants</h3>
        </div>

        <div
          className="cart-icon"
          onClick={onCartClick}
          style={{ cursor: 'pointer' }}
        >
          <span role="img" aria-label="cart">
            🛒
          </span>
          <span className="cart-count">{calculateTotalQuantity()}</span>
        </div>
      </div>

      {plantsArray.map((section, sectionIndex) => (
        <div key={sectionIndex} className="plant-category">
          <h2>{section.category}</h2>

          <div className="plant-grid">
            {section.plants.map((plant, plantIndex) => (
              <div key={plantIndex} className="plant-card">
                <img src={plant.image} alt={plant.name} className="plant-image" />
                <h3>{plant.name}</h3>
                <p>{plant.description}</p>
                <p>{plant.cost}</p>

                <button
                  onClick={() => handleAddToCart(plant)}
                  disabled={isInCart(plant.name)}
                  className={isInCart(plant.name) ? 'added-to-cart-btn' : ''}
                >
                  {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;