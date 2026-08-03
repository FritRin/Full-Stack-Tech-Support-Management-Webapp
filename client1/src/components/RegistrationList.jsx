import React, { useEffect, useState } from 'react';
import '../css/main.css';

const RegistrationList = ({ registrations, setRegistration}) => {
  //const [Registrations, setRegistrations] = useState([]); 
  const [customerId, setId] = useState('');
  const [productCode, setCode] = useState('');
  const [registrationDate, setRegistrationDate] = useState('');

  return (
    registrations.length > 0 ? 
    <div className="container">
          <div className="main-panel">
            
            <h2>Registered Products</h2>
            <div className='table-container mb-4'>
              <table>
                <thead>
                  <tr>
                    <th>Product Code</th>
                    <th>Registration Date</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((registration) => (
                  <tr key={`${registration.customerId}-${registration.productCode}`}>
                    <td>{registration.productCode}</td>
                    <td>{registration.registrationDate}</td>
                  </tr>
                  ))}
                  
                </tbody>
              </table>
            </div>
          </div> 
        </div>:
    <><h2>Registration List</h2><p>No Data!</p></>
  );
};

export default RegistrationList;