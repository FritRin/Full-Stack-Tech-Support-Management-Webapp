import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContent';
import '../css/main.css'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setError('');
        try {
            const user = await login({username, password});
            if (user.role === 'admin') {
                navigate('/admin');
            } else if (user.role === "technician") {
                navigate('/technician');
            } else {
                navigate('/customer');
            }
        } catch (err) {
            setError('Invalid username or password.')
        }

};
    return(
        <div className='container'>
            <div className='main-panel small-panel'>
                <div className='header-section'>
                    <h2>Login</h2>
                </div>

                <div className='login-panel mb-4'>
                    <p>You must login to register products.</p>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label>Username:</label>
                            <input
                             type="text"
                             value={username}
                             onChange={(e) => setUsername(e.target.value)}
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

export default Login;