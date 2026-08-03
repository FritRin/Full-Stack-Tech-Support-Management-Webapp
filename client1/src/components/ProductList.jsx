import React, { useEffect, useState } from 'react';
import '../css/main.css';

const ProductList = ({ updateProducts, deleteProduct, products, setProducts}) => {
  //const [products, setProducts] = useState([]); 
  const [editingProduct, setEditingProduct] = useState(null);
  const [productCode, setCode] = useState('');
  const [name, setName] = useState('');
  const [version, setVersion] = useState('');
  const [releaseDate, setreleaseDate] = useState('');

  const handleEdit = (product) => {
    setEditingProduct(product);
    setCode(product.productCode);
    setName(product.name);
    setVersion(product.version);
    setreleaseDate(product.releaseDate)
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedProduct = { ...editingProduct, productCode, name, version };
    updateProducts(updatedProduct);
    setEditingProduct(null);
    setCode('');
    setName('');
    setVersion('');
  };

  return (
    products.length > 0 ? 
    <div className='container'>
      <div className='main-panel'>
        <div class='header-section'>
          <h2>Product List</h2>
        </div>
          <div className="table-container mb-4">
            <table>
              <thead>
                <tr>
                  <th>Product Code</th>
                  <th>Product Name</th>
                  <th>Version</th>
                  <th>Release Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.productCode}>
                    <td>{product.productCode}</td> 
                    <td>{product.name}</td> 
                    <td>{product.version}</td> 
                    <td>{product.releaseDate}</td>
                    <td>
                        <button className='btn btn-secondary' 
                        onClick={() => handleEdit(product)}>
                          Edit</button>
                        <button className='btn btn-danger' 
                        onClick={() => deleteProduct(product.productCode)}>
                          Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {editingProduct && (
            <form onSubmit={handleUpdate}>
              <h3>Edit Product</h3>
              <div className='form-group'>
                <label>Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className='form-group'>
                <label>Version:</label>
                <input
                  type="text"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className='btn btn-primary'>Update product</button>
            </form>
          )}
      </div>
    </div>:
    <><h2>Product List</h2><p>No Data!</p></>
  );
};

export default ProductList;