import React, { useState, useEffect } from 'react';
import '../css/main.css';
import NewProduct from '../components/NewProduct';
import ProductList from '../components/ProductList';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setProducts(data);
          } else {
            console.error('Fetched data is not an array');
          }
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProducts();
  }, [refresh]);

  const addProduct = (product) => {
    setRefresh((current) => !current);
  };

  const updateProducts = async (product) => {
    try {
      const response = await fetch(`/api/products/${product.productCode}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts(products.map((p) => (p.productCode === updatedProduct.productCode ? updatedProduct : p)));
        setRefresh(!refresh);
      } else {
        console.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteProduct = async (productCode) => {
    try {
      const response = await fetch(`/api/products/${productCode}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter((product) => product.productCode !== productCode));
        setRefresh(!refresh);
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  console.table(products);
  return (
    <div className="container">
      <div className='main-panel'>
        <h1>Product Management</h1>
        <NewProduct addProduct={addProduct} />
        <ProductList products={products} updateProducts={updateProducts} deleteProduct={deleteProduct} setProducts={setProducts} />
      </div> 
    </div>
  );
};

export default Products;