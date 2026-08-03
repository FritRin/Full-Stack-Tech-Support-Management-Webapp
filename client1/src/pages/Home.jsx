import React from 'react';
import { Link } from 'react-router-dom';
import '../css/main.css';

const Home = () =>
{
    return (
        <div>
        <header className="header">
        <div className="container">
            <h1>SportsPro Technical Support</h1>
            <p>Sports management software for the sports enthusiast</p>
        </div>
    </header>
    
    <main className="container">
        <div className="main-panel">
            <h2>SportsPro Technical Support</h2>
            
            <div className="menu-section">
                <h3>Administrators</h3>
                <ul className="menu-list">
                <li>
                    <Link to="/products">Products</Link>
                </li>

                <li>
                    <Link to="/technicians">Technicians</Link>
                </li>

                <li>
                    <Link to="/customers">Customers</Link>
                </li>
                </ul>
            </div>
            
            <div className="menu-section">
                <h3>Customers</h3>
                <ul className="menu-list">
                    <li>
                        <Link to="/registrations">Product Registration</Link>
                    </li>
                </ul>
            </div>
        </div>
    </main>
    
    <footer>
        <div className="container">
            <p>&copy; 2025 SportsPro, Inc.</p>
        </div>
    </footer>
    </div>
    );
};

export default Home;