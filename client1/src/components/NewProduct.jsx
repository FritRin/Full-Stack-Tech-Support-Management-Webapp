import React, { useState } from "react";
import "../css/main.css";

const NewProduct = ({ addProduct }) => {
  const [productCode, setCode] = useState("");
  const [name, setName] = useState("");
  const [version, setVersion] = useState("");
  const [releaseDate, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = { productCode, name, version, releaseDate };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const createdProduct = await response.json();
        addProduct(createdProduct); // Pass the new user to the parent component
        setCode("");
        setName("");
        setVersion("");
        setDate("");
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-panel">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Code:</label>
          <input
            type="text"
            value={productCode}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Version:</label>
          <input
            type="text"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
          type="date"
          value={releaseDate}
          onChange={(e) => setDate(e.target.value)}
          required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
};

export default NewProduct;