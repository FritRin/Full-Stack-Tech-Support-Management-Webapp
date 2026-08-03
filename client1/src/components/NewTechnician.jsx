import React, { useState } from 'react';
import '../css/main.css';

const NewTechnician = ({ addTechnician }) => {
  const [techId, setId] = useState('');
  const [firstName, setFname] = useState('');
  const [lastName, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTechnician = { techId, firstName, lastName, email, phone, password };

    try {
      const response = await fetch('/api/technicians', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTechnician),
      });

      if (response.ok) {
        const createdTechnician = await response.json();
        addTechnician(createdTechnician); // Pass the new user to the parent component
        setId('');
        setFname('');
        setLname('');
        setEmail('');
        setPhone('');
        setPassword('');
      } else {
        console.error('Failed to add Technician');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='form-panel'>
      <form onSubmit={handleSubmit}>

        <div className='form-group'>
          <label>Technician First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label>Technician Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLname(e.target.value)}
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
          <label>Password:</label>
          <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
        </div>
        <button type="submit" className='btn btn-primary'>Add Technician</button>
      </form>
    </div>
  );
};

export default NewTechnician;