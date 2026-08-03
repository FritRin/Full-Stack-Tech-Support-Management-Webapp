import React, { useState } from 'react';
import '../css/main.css';

const NewCustomer = ({ addCustomer }) => {
  const [customerId, setId] = useState('');
  const [firstName, setFname] = useState('');
  const [lastName, setLname] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [countries, setCountries] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCustomer = { customerId, firstName, lastName, phone, email, password };

    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCustomer),
      });

      if (response.ok) {
        const createdCustomer = await response.json();
        addCustomer(createdCustomer); // Pass the new user to the parent component
        setId('');
        setFname('');
        setLname('');
        setAddress('');
        setCity('');
        setState('');
        setPostalCode('');
        setCountryCode('');
        setPhone('');
        setEmail('');
        setPassword('');
      } else {
        console.error('Failed to add Customer');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='form-panel'>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Customer First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label>Customer Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLname(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label>Customer Address:</label>
          <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          />
        </div>
        <div className='form-group'>
          <label>Customer City:</label>
          <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          />
        </div>
        <div className='form-group'>
          <label>Customer State:</label>
          <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
          />
        </div>
        <div className='form-group'>
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            required>
            <option value="">Customer Country:</option>
            {countries.map((country) => (
              <option key={country.countryCode} value={country.countryCode}>
                {country.countryCode} - {country.countryName}
              </option>
            ))}
          </select>
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
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
        <div className='form-group'>
          <label>Password:</label>
          <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
        </div>
        </div>
        <button type="submit" className='btn btn-primary'>Add Customer</button>
      </form>
    </div>
  );
};

export default NewCustomer;