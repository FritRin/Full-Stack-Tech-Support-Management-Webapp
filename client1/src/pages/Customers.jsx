import React, { useState, useEffect } from 'react';
import '../css/main.css';
import NewCustomer from '../components/NewCustomer';
import CustomerList from '../components/CustomerList';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('/api/customers');
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setCustomers(data);
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

    fetchCustomers();
  }, [refresh]);

  const addCustomer = (customer) => {
    setRefresh((current) => !current);
  };

  const searchCustomer = async () => {
    try {const response = await fetch(`/api/customers/search?lastName=${encodeURIComponent(searchName)}`);

      if (response.ok){
        const data = await response.json();
        setCustomers(data);
      } else{
        console.error('Failed to search customers');
      }
    } catch (error){
      console.error('Error searching customers:', error);
      
    }
  }

  const updateCustomers = async (customer) => {
    try {
      const response = await fetch(`/api/customers/${customer.customerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
      });

      if (response.ok) {
        const updatedCustomer = await response.json();
        setCustomers(customers.map((c) => (c.customerId === updatedCustomer.customerId? updatedCustomer : c)));
        setRefresh(!refresh);
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteCustomer = async (customerId) => {
    try {
      const response = await fetch(`/api/customers/${customerId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCustomers(customers.filter((customer) => customer.customerId !== customerId));
        setRefresh(!refresh);
      } else {
        console.error('Failed to delete Customer');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  console.table(customers);
  return (
    <div className='container'>
      <div className='main-panel'>
        <h1>Customer Management</h1>
        <NewCustomer addCustomer={addCustomer} />
        <div className='search-panel'>
          <form onSubmit={(e) => {
            e.preventDefault();
            searchCustomer();
          }}>
            <div className='search-row'>
              <input type='text' placeholder='Search last name' value={searchName} onChange={(e) => setSearchName(e.target.value)}/>
              <button type='submit' className='btn btn-primary'>Search</button>
              <button type='button' className='btn btn-secondary' onClick={() => {
                setSearchName('');
                setRefresh((current) => !current);
              }}>Clear</button>
            </div>
          </form>
        </div>
        <CustomerList customers={customers} updateCustomers={updateCustomers} deleteCustomer={deleteCustomer} setCustomers={setCustomers} />
      </div> 
    </div>
  );
};

export default Customers;