import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Route, Routes, Router } from 'react-router-dom';
import Navbar from './elements/Navbar';
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
  return (
    <BrowserRouter>

    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/products' element={<ProtectedRoute allowedRoles = {['admin', 'customer', 'technician']}><Products /></ProtectedRoute>}/>
      <Route path='/products/:productCode' element={<ProtectedRoute allowedRoles = {['admin', 'customer', 'technician']}><Product /></ProtectedRoute>}/>
      <Route path='/technicians' element={<ProtectedRoute allowedRoles = {['admin', 'technician']}><Technicians /></ProtectedRoute>}/>
      <Route path='/technicians/:techId' element={<ProtectedRoute allowedRoles = {['admin', 'technician']}><Technician /></ProtectedRoute>}/>
      <Route path='/customers' element={<ProtectedRoute allowedRoles = {['admin']}><Customers /></ProtectedRoute>}/>
      <Route path='/customers/:customerId' element={<ProtectedRoute allowedRoles = {['admin']}><Customer /></ProtectedRoute>}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/registrations/:customerId' element={<ProtectedRoute allowedRoles = {['admin', 'customer']}><Registrations /></ProtectedRoute>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;