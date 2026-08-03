import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContent';
import { useContext } from 'react';
import '../css/main.css'

const CustomerLogin = ({ setLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const history = useNavigate();
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login('customer', {email, password});
        navigate('/');
        setError('');

};
    return(
        <div className='container'>
            <div className='main-panel small-panel'>
                <div className='header-section'>
                    <h2>Customer Login</h2>
                </div>

                <div className='login-panel mb-4'>
                    <p>You must login to register products.</p>
                    <form onSubmit={handleSubmit}>
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
                            <input
                             type="password"
                             value={password}
                             onChange={(e) => setPassword(e.target.value)}
                             required
                            />
                        </div>
                        {error && (
                            <div className='alert alert-danger'>
                                {error}
                            </div>
                        )}
                        <button type='submit' className='btn btn-primary'>
                            Login
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default CustomerLogin;