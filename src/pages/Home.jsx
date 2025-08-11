import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Home = () => {
  useWindowScrollToTop();
  const navigate = useNavigate();
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="hero-inner">
          <div className="hero-text">
            <p className="hero-trend">Trending product in 2023</p>
            <h1 className="hero-title">Make Your Interior More Min & Modern</h1>
            <p className="hero-welcome">Welcome Hello Baby</p>
            <button className="cta-button" onClick={() => navigate("/shop")}>SHOP NOW</button>
          </div>
          <div className="hero-image">
            <img src={require("../Images/hero-img.png")} alt="Hero" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Free Shipping</h3>
              <p>Free delivery on orders over ₹50</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>Easy Returns</h3>
              <p>30-day return policy</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Secure Payment</h3>
              <p>100% secure checkout</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📞</div>
              <h3>24/7 Support</h3>
              <p>Get help anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section" id="shop">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            <div className="category-card" onClick={() => navigate("/shop")}>
              <div className="category-image">
                <img src={require("../Images/arm-chair-01.jpg")} alt="Furniture" />
              </div>
              <div className="category-content">
                <h3>Furniture</h3>
                <p>Comfortable and stylish furniture for your home</p>
              </div>
            </div>
            <div className="category-card" onClick={() => navigate("/shop")}>
              <div className="category-image">
                <img src={require("../Images/phone-02.jpg")} alt="Electronics" />
              </div>
              <div className="category-content">
                <h3>Electronics</h3>
                <p>Latest gadgets and electronic devices</p>
              </div>
            </div>
            <div className="category-card" onClick={() => navigate("/shop")}>
              <div className="category-image">
                <img src={require("../Images/wireless-01.png")} alt="Accessories" />
              </div>
              <div className="category-content">
                <h3>Accessories</h3>
                <p>Essential accessories for daily use</p>
              </div>
            </div>
            <div className="category-card" onClick={() => navigate("/shop")}>
              <div className="category-image">
                <img src={require("../Images/double-sofa-01.png")} alt="Home Decor" />
              </div>
              <div className="category-content">
                <h3>Home Decor</h3>
                <p>Beautiful decor items for your space</p>
              </div>
            </div>
            <div className="category-card" onClick={() => navigate("/shop?category=dining-table")}>
              <div className="category-image">
                <img src={require("../Images/dining-table-01.jpg")} alt="Dining Table" />
              </div>
              <div className="category-content">
                <h3>Dining Table</h3>
                <p>Elegant dining tables for your home</p>
              </div>
            </div>
            <div className="category-card" onClick={() => navigate("/shop?category=bedsheet")}>
              <div className="category-image">
                <img src={require("../Images/bedsheet-01.jpg")} alt="Bedsheet" />
              </div>
              <div className="category-content">
                <h3>Bedsheet</h3>
                <p>Premium bedsheets for a cozy sleep</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" id="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Why Choose Bringit?</h2>
              <p>
                We believe in providing quality products that enhance your daily life. 
                Our carefully curated selection ensures you get the best value for your money, 
                with products that are both functional and aesthetically pleasing.
              </p>
              <div className="about-features">
                <div className="about-feature">
                  <span className="checkmark">✓</span>
                  <span>Quality guaranteed products</span>
                </div>
                <div className="about-feature">
                  <span className="checkmark">✓</span>
                  <span>Competitive pricing</span>
                </div>
                <div className="about-feature">
                  <span className="checkmark">✓</span>
                  <span>Excellent customer service</span>
                </div>
              </div>
              <button className="secondary-button" onClick={() => navigate("/shop")}>
                Explore Products
              </button>
            </div>
            <div className="about-image">
              <img src={require("../Images/hero-img.png")} alt="About Bringit" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <div className="container">
          <div className="contact-content">
            <h2>Get in Touch</h2>
            <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <div>
                  <h4>Email</h4>
                  <p>info@bringit.com</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <h4>Phone</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <h4>Address</h4>
                  <p>123 Commerce St, Business City, BC 12345</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
