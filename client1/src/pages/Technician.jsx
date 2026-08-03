import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

const Technician = () => {
    const { techId } = useParams();

    const [technician, setTechnician] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTechnician = async () => {
            try {
                const response = await fetch(`/api/technicians/${techId}`);

                if (response.ok) {
                    const data = await response.json();
                    setTechnician(data);
                } else if (response.status === 404) {
                    setError('Technician not found.');
                } else {
                    setError('Failed to fetch Technician.');
                }
            } catch (error) {
                console.error(error);
                setError('Internal server error.');
            }
        };

        fetchTechnician();
    }, [techId]);

    if (error) {
        return <p>{error}</p>
    }

    if(!technician){
        return <p>Loading...</p>
    }

    return (
        <div className='container'>
            <div className='main-panel'>
                <h2>Technician Details</h2>

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
                            <td>{technician.firstName}</td>
                            <td>{technician.lastName}</td>
                            <td>{technician.email}</td>
                            <td>{technician.phone}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Technician;