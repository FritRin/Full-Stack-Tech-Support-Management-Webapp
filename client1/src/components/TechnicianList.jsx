import React, { useState } from 'react';
import '../css/main.css';

const TechnicianList = ({ updateTechnicians, deleteTechnician, technicians, setTechnicians}) => {
  //const [Technicians, setTechnicians] = useState([]); 
  const [editingTechnician, setEditingTechnician] = useState(null);
  const [techId, setId] = useState('');
  const [firstName, setFname] = useState('');
  const [lastName, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleEdit = (technician) => {
    setEditingTechnician(technician);
    setId(technician.techId);
    setFname(technician.firstName);
    setLname(technician.lastName);
    setEmail(technician.email);
    setPhone(technician.phone);
    setPassword(technician.password);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedTechnician = { ...editingTechnician, techId, firstName, lastName, email, phone, password };
    updateTechnicians(updatedTechnician);
    setEditingTechnician(null);
    setId('');
    setFname('');
    setLname('');
    setEmail('');
    setPhone('');
    setPassword('');
  };

  return (
    technicians.length > 0 ?
    <div className='container'>
      <div className='main-panel'>
        <div className='header-section'>
          <h2>Technician List</h2>
        </div>
        <div className='table-container mb-4'>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {technicians.map((technician) => (
                <tr key={technician.techId}>
                  <td>{technician.firstName}</td> 
                  <td>{technician.lastName}</td> 
                  <td>{technician.email}</td>
                  <td>{technician.phone}</td>
                  <td>
                    <div style={{ display: 'flex' }}>
                        <button className='btn btn-secondary' 
                        onClick={() => handleEdit(technician)}>
                          Edit</button>
                        <button className='btn btn-danger' 
                        onClick={() => deleteTechnician(technician.techId)}>
                          Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {editingTechnician && (
            <form onSubmit={handleUpdate}>
              <h3>Edit Technician</h3>
              <div className="form-group">
                <label>First Name:</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFname(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name:</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLname(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <div className="form-group">
                <label>Password:</label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                </div>
              </div>
              <button type="submit" className='btn btn-primary'>Update Technician</button>
            </form>
          )}
        </div>
      </div> 
    </div>:
    <><h2>Technician List</h2><p>No Data!</p></> 
  );
};

export default TechnicianList;