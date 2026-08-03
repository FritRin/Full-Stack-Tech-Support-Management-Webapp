import React, { useState, useEffect } from 'react';
import '../css/main.css';
import NewTechnician from '../components/NewTechnician';
import TechnicianList from '../components/TechnicianList';

const Technicians = () => {
  const [technicians, setTechnicians] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await fetch('/api/technicians');
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setTechnicians(data);
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

    fetchTechnicians();
  }, [refresh]);

  const addTechnician = (technician) => {
    setRefresh((current) => !current);
  };

  const updateTechnicians = async (technician) => {
    try {
      const response = await fetch(`/api/technicians/${technician.techId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(technician),
      });

      if (response.ok) {
        const updatedtechnician = await response.json();
        setTechnicians(technicians.map((t) => (t.techId === updatedtechnician.techId? updatedtechnician : t)));
        setRefresh(!refresh);
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteTechnician = async (techId) => {
    try {
      const response = await fetch(`/api/technicians/${techId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTechnicians(technicians.filter((technician) => technician.techId !== techId));
        setRefresh(!refresh);
      } else {
        console.error('Failed to delete technician');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  console.table(technicians);
  return (
    <div className="container">
      <div className='main-panel'>
        <h1>Technician Management</h1>
        <NewTechnician addTechnician={addTechnician} />
        <TechnicianList technicians={technicians} updateTechnicians={updateTechnicians} deleteTechnician={deleteTechnician} setTechnicians={setTechnicians} />
      </div> 
    </div>
  );
};

export default Technicians;