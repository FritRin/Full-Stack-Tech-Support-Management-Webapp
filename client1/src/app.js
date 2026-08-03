import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Route, Routes, Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Product from './pages/Product';
import Technicians from './pages/Technicians';
import Technician from './pages/Technician';
import Customers from './pages/Customers';
import Customer from './pages/Customer';
import Registrations from './pages/Registrations';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './css/main.css';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(
    !!localStorage.getItem('token')
  );
  return (
    <BrowserRouter>

    <Navbar />
    <Routes>
      <Route path='/' component={<Home />}/>
      <Route path='/products' component={<Products />}/>
      <Route path='/products/:productCode' component={<Product />}/>
      <Route path='/technicians' component={<Technicians />}/>
      <Route path='/technicians/:techId' component={<Technician />}/>
      <Route path='/customers' component={<Customers />}/>
      <Route path='/customers/:customerId' component={<Customer />}/>
      <Route path='/customers/login' component={<Login setLoggedIn={setLoggedIn} />}/>
      <Route path='/registrations/:customerId' component={<ProtectedRoute isLoggedIn={isLoggedIn}><Registrations /></ProtectedRoute>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;