import React from 'react';
import { Link } from 'react-router-dom';
import '../css/main.css';

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='container'>
                <h2>SportsPro Technical Support</h2>
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/technicians">Technicians</Link>
                <Link to="/customers">Customers</Link>
                <Link to="/customers/login">Product Registration</Link>
            </div>
        </div>
    )
};

export default Navbar;