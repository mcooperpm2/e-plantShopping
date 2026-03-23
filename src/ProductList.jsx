import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

const plantsArray = [
  {
    name: 'Snake Plant',
    cost: '$15',
    image:
      'https://plus.unsplash.com/premium_photo-1673969608395-9281e5e4395f?q=80&w=708&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Produces oxygen and helps improve air quality.',
    categories: ['Air Purifying Plants'],
  },
  {
    name: 'Spider Plant',
    cost: '$12',
    image:
      'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80',
    description: 'Filters formaldehyde and other toxins from the air.',
    categories: ['Air Purifying Plants'],
  },
  {
    name: 'Peace Lily',
    cost: '$18',
    image:
      'https://images.unsplash.com/photo-1598880940080-ff9a29891b85?auto=format&fit=crop&w=600&q=80',
    description: 'Removes mold spores and purifies indoor air.',
    categories: ['Air Purifying Plants'],
  },
  {
    name: 'Lavender',
    cost: '$20',
    image:
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=600&q=80',
    description: 'Known for its calming fragrance and relaxing effect.',
    categories: ['Aromatic Plants'],
  },
  {
    name: 'Jasmine',
    cost: '$22',
    image:
      'https://plus.unsplash.com/premium_photo-1676068243733-df1880c2aef8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amFzbWluZSUyMGZsb3dlcnxlbnwwfHwwfHx8MA%3D%3D',
    description: 'A fragrant flowering plant that freshens any room.',
    categories: ['Aromatic Plants'],
  },
  {
    name: 'Mint',
    cost: '$10',
    image:
      'https://images.unsplash.com/photo-1656501020056-1c631268e3d0?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Fresh aroma and useful for tea, cooking, and décor.',
    categories: ['Aromatic Plants', 'Medicinal Plants'],
  },
  {
    name: 'Aloe Vera',
    cost: '$14',
    image:
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80',
    description: 'A medicinal plant known for soothing skin benefits.',
    categories: ['Medicinal Plants'],
  },
  {
    name: 'Tulsi',
    cost: '$13',
    image:
      'https://images.unsplash.com/photo-1665479754958-1a8bdc47cc0d?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'A sacred herb widely known for wellness properties.',
    categories: ['Medicinal Plants'],
  },
];

const categories = [
  'Air Purifying Plants',
  'Aromatic Plants',
  'Medicinal Plants',
];

function Header({ onGoHome, onGoToCart, totalQuantity }) {
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
        <button className="nav-link" onClick={onGoHome}>
          Home
        </button>
        <button className="nav-link" onClick={onGoToCart}>
          Cart
          <span className="cart-count">{totalQuantity}</span>
        </button>
      </nav>
    </header>
  );
}

function ProductList({ onGoHome, onGoToCart }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const calculateTotalQuantity = () => {
    return cartItems
      ? cartItems.reduce((total, item) => total + item.quantity, 0)
      : 0;
  };

  const isInCart = (plantName) => {
    return cartItems.some((item) => item.name === plantName);
  };

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  return (
    <div className="page-shell">
      <Header
        onGoHome={onGoHome}
        onGoToCart={onGoToCart}
        totalQuantity={calculateTotalQuantity()}
      />

      <main className="product-page">
        {categories.map((category) => {
          const filteredPlants = plantsArray.filter((plant) =>
            plant.categories.includes(category)
          );

          return (
            <section key={category} className="plant-section">
              <h2 className="section-title">{category}</h2>

              <div className="product-grid">
                {filteredPlants.map((product) => {
                  const added = isInCart(product.name);

                  return (
                    <div key={`${category}-${product.name}`} className="product-card">
                      <div className="sale-badge">SALE</div>

                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                      />

                      <h3>{product.name}</h3>
                      <p className="product-cost">{product.cost}</p>
                      <p className="product-description">{product.description}</p>

                      <button
                        className={`add-to-cart-btn ${added ? 'added' : ''}`}
                        onClick={() => handleAddToCart(product)}
                        disabled={added}
                      >
                        {added ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}

export default ProductList;