import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from './AuthContent';
import '../css/main.css';

const IncidentList = ({ updateIncident, assignIncident, incidents, setIncidents}) => {
  //const [incidents, setIncidents] = useState([]); 
  const [editingincident, setEditingincident] = useState(null);
  const [customerId, setCustomerId] = useState('');
  const [productCode, setProductCode] = useState('');
  const [techId, setTechId] = useState('');
  const [dateOpened, setDateOpened] = useState('');
  const [dateClosed, setDateClosed] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [technician, setTechnicians] = useState([]);
  const [closed, setClosed] = useState(false);
  const { user } = useContext(AuthContext)

  const handleEdit = (incident) => {
    setEditingincident(incident);

    setCustomerId(incident.customerId);
    setProductCode(incident.productCode);
    setTechId(incident.techId);
    setDateOpened(incident.dateOpened);
    setDateClosed(incident.dateClosed);
    setTitle(incident.title);
    setDescription(incident.description);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (user.role === 'admin') {
        await assignIncident({
            incidentId: editingincident.incidentId, 
            techId
        });
    }

    if (user.role === 'technician') {
        await updateIncident({
            incidentId: editingincident.incidentId,
            description,
            dateClosed: closed ? new Date().toISOString().split('T')[0] : null
        });
    }
    
    setEditingincident(null);
  };

  return (
    incidents.length > 0 ? 
    <div className='container'>
      <div className='main-panel'>
        <div class='header-section'>
          <h2>incident List</h2>
        </div>
          <div className="table-container mb-4">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Technician</th>
                  <th>Date Opened</th>
                  <th>Date Closed</th>
                  <th>Title</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((incident) => (
                  <tr key={incident.incidentId}>
                    <td>{incident.incidentId}</td> 
                    <td>{incident.customerId}</td> 
                    <td>{incident.productCode}</td> 
                    <td>{incident.techId}</td>
                    <td>{incident.dateOpened}</td>
                    <td>{incident.dateClosed}</td>
                    <td>{incident.title}</td>
                    <td>
                        <button className='btn btn-secondary' >
                          View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {editingincident && (
            <form onSubmit={handleUpdate}>
                {user?.role === 'admin' && (
                    
                    <div className='form-group'>
                        <label>Assign Technician:</label>
                        <select
                            value={techId}
                            onChange={(e) => setTechId(e.target.value)}
                            required>
                            <option value="">Select a product</option>
                            {products.map((technician) => (
                            <option key={technician.techId} value={technician.techId}>
                                {technician.techId} - {technician.firstName} {technician.lastName}
                            </option>
                            ))}
                        </select>
                    </div>
                )}

                {user?.role === 'technician' &&(
                    <>
                        <div className='form-group'>
                            <label>Description:</label>
                            <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required/>
                        </div>

                        <div className='form-group'>
                            <label>
                                <input type='checkbox'
                                checked={closed}
                                onChange={(e) => setClosed(e.target.checked)}/>
                                Close Incident
                            </label>
                        </div>
                    </>
                )}

              
              <button type="submit" className='btn btn-primary'>
                {user?.role ==='admin'
                ? 'Assign Technician'
                : 'Update incident'}
            </button>
            </form>
          )}
      </div>
    </div>:
    <><h2>incident List</h2><p>No Data!</p></>
  );
};

export default IncidentList;