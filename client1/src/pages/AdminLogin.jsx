import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../components/AuthContent';
import '../css/main.css'

const Login = ({ setLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const history = useHistory();
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await Login(username, password);
        history.push('/');
        setError('');

};
    return(
        <div className='container'>
            <div className='main-panel small-panel'>
                <div className='header-section'>
                    <h2>Administrator Login</h2>
                </div>

                <div className='login-panel mb-4'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label>Username:</label>
                            <input
                             type="username"
                             value={username}
                             onChange={(e) => setUsername(e.target.value)}
                             required
                            />
                        </div>
                        <div className='form-group'>
                            <label>Password:</label>
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