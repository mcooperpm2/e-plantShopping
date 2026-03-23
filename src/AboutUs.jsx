import React from 'react';

function AboutUs({ onGetStarted }) {
  return (
    <div className="landing-page">
      <div className="landing-overlay">
        <div className="landing-content">
          <div className="landing-brand-block">
            <h1>Welcome To Paradise Nursery</h1>
            <p className="landing-tagline">Where Green Meets Serenity</p>
            <button className="cta-button" onClick={onGetStarted}>
              Get Started
            </button>
          </div>

          <div className="landing-copy">
            <p>
              At Paradise Nursery, we are passionate about bringing nature closer
              to you. Our mission is to provide a wide range of high-quality
              plants that not only enhance the beauty of your surroundings but
              also contribute to a healthier and more sustainable lifestyle.
            </p>

            <p>
              From air-purifying plants to aromatic fragrances, we have
              something for every plant enthusiast. Our team is dedicated to
              ensuring that each plant meets our strict standards of quality and
              care.
            </p>

            <p>
              Whether you are a seasoned gardener or just starting your green
              journey, we are here to support you every step of the way. Explore
              our collection, ask questions, and let us help you find the
              perfect plant for your home or office.
            </p>

            <p>
              Join us in creating a greener, healthier world. Visit Paradise
              Nursery today and experience the beauty of nature right at your
              doorstep.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
