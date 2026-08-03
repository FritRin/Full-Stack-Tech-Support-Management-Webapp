import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/main.css';

const NewRegistration = ({ addRegistration }) => {
  const [productCode, setProductCode] = useState('');
  const [products, setProducts] = useState([]);
  const { customerId } = useParams();


  useEffect(() =>{
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');

        if (response.ok) {
          const data = await response.json();
          setProducts(data)
        }
      } catch (error) {
        console.error('Error fetching products:', error); 
      }
    };
    fetchProducts();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const registrationDate = new Date().toISOString().split('T')[0];
    const newRegistration = { customerId, productCode, registrationDate };

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newRegistration),
      });

      if (response.ok) {
        const createdRegistration = await response.json();
        addRegistration(createdRegistration); // Pass the new user to the parent component
        setProductCode('');
      } else {
        console.error('Failed to register product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='form-panel'>
    <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Select the product you wish to register:</label>
          <select
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
            required>
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.productCode} value={product.productCode}>
                {product.productCode} - {product.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className='btn btn-primary'>Register Product</button>
      </form>
    </div>
  );
};

export default NewRegistration;