import React, { useState, useEffect } from 'react';
import '../css/main.css';
import NewRegistration from '../components/NewRegistration';
import RegistrationList from '../components/RegistrationList';
import { useParams } from 'react-router-dom';

const Registrations = () => {
  const { customerId } = useParams();
  const [registrations, setRegistration] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await fetch(`/api/registrations/${customerId}`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setRegistration(data);
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

    fetchRegistrations();
  }, [customerId, refresh]);

  const addRegistration = (registration) => {
    setRefresh((current) => !current);
  };
    console.table(registrations);
  return (
    <div className="container">
      <div className="main-panel">
        <h1>Registration Management</h1>
        <NewRegistration addRegistration={addRegistration} />
        <RegistrationList registrations={registrations} setRegistration={setRegistration} />
      </div> 
    </div>
  );
};

export default Registrations;