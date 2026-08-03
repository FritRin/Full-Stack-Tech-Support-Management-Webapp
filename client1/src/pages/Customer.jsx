import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

const Customer = () => {
    const { customerId } = useParams();

    const [customer, setCustomer] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await fetch(`/api/Customers/${customerId}`);

                if (response.ok) {
                    const data = await response.json();
                    setCustomer(data);
                } else if (response.status === 404) {
                    setError('Customer not found.');
                } else {
                    setError('Failed to fetch Customer.');
                }
            } catch (error) {
                console.error(error);
                setError('Internal server error.');
            }
        };

        fetchCustomer();
    }, [customerId]);

    if (error) {
        return <p>{error}</p>
    }

    if(!customer){
        return <p>Loading...</p>
    }

    return (
        <div className='container'>
            <div className='main-panel'>
                <h2>Customer Details</h2>

                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{customer.firstName}</td>
                            <td>{customer.lastName}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Customer;