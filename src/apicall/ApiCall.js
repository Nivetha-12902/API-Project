import React, { useState, useEffect } from "react";

export default function ApiCall (){
  const [products, setProducts] = useState([]); // State to store fetched products
  const [loading, setLoading] = useState(true); // Loading indicator state
  const [error, setError] = useState(null); // Error state

  const API_URL = "https://api.escuelajs.co/api/v1/products";

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        setLoading(true); // Set loading to true
        const response = await fetch(API_URL); // Fetch data from the API
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`); // Handle HTTP errors
        }
        const data = await response.json(); // Parse JSON response
        setProducts(data); // Update state with fetched products
      } catch (err) {
        setError(err.message); // Set error state
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchProducts();
  }, []); // Run only once when the component mounts

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Clothing Store</h1>
      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && products.length === 0 && <p>No products found!</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              width: "200px",
              textAlign: "center",
            }}
          >
            <img
              src={product.images[0]} // Use the first image from the product
              alt={product.title}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <h3 style={{ fontSize: "16px", margin: "10px 0" }}>{product.title}</h3>
            <p style={{ color: "#555" }}>Price: ${product.price}</p>
            <button
              style={{
                padding: "5px 10px",
                border: "none",
                backgroundColor: "#007bff",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
