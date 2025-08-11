import React, { useState } from "react";
import { products } from "../utils/products";
import ProductCard from "../components/ProductCard/ProductCard";
import "../styles/shop.css";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Shop = () => {
  useWindowScrollToTop();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products based on category and search term
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get unique categories for filter
  const categories = ["all", ...new Set(products.map(product => product.category))];

  return (
    <div className="shop-container">
      {/* Header Section */}
      <header className="shop-header">
        <div className="container">
          <h1 className="shop-title">Our Products</h1>
          <p className="shop-subtitle">Discover quality products for your lifestyle</p>
        </div>
      </header>

      {/* Filter Section */}
      <section className="filter-section">
        <div className="container">
          <div className="filter-controls">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="category-filter">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="category-select"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-section">
        <div className="container">
          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <h3>No products found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  title={null}
                  productItem={product}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Results Info */}
      <section className="results-info">
        <div className="container">
          <p className="results-text">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>
      </section>
    </div>
  );
};

export default Shop;
