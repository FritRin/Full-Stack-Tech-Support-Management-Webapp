import React, { useEffect, useState } from 'react';
import '../css/main.css';

const CustomerList = ({ updateCustomers, deleteCustomer, customers, setCustomers}) => {
  //const [Customers, setCustomers] = useState([]); 
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [customerId, setId] = useState('');
  const [firstName, setFname] = useState('');
  const [lastName, setLname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setId(customer.customerId);
    setFname(customer.firstName);
    setLname(customer.lastName);
    setPhone(customer.phone);
    setEmail(customer.email);
    setPassword(customer.password);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedCustomer = { ...editingCustomer, customerId, firstName, lastName, phone, email, password };
    updateCustomers(updatedCustomer);
    setEditingCustomer(null);
    setId('');
    setFname('');
    setLname('');
    setPhone('');
    setEmail('');
    setPassword('');
  };

  return (
    customers.length > 0 ? 
    <div>
      <h2>Customer List</h2>
      
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.customerId}className="customer-item">
              <td>{customer.firstName} {customer.lastName}</td>
              <td>{customer.email}</td>
              <td>{customer.phone} </td>
              <td>  
                <button className='btn btn-secondary'
                onClick={() => handleEdit(customer)}>
                  Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingCustomer && (
        <form onSubmit={handleUpdate}>
          <h3>Edit Customer</h3>
          <div className='form-group'>
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFname(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLname(e.target.value)}
              required
            />
          </div>
      <div className='form-group'>
        <label>Phone:</label>
        <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        />
      </div>
      <div className='form-group'>
        <label>Email:</label>
        <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
      </div>
      <div className='form-group'>
        <label>Password:</label>
        <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
      </div>
          <button className='btn btn-primary' type="submit">Update Customer</button>
      </form>
      )}
    </div>:
    <><h2>Customer List</h2><p>No Data!</p></>
  );
};

export default CustomerList;