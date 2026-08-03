import React, { createContext, useState } from 'react';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    const login = async (role, credentials) => {
        const response = await fetch(`/api/${role}s/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        if(response.ok){
            const data = await response.json();

            setToken(data.token);
            localStorage.setItem('token', data.token);
            localStorage.setItem(
                'user',
                JSON.stringify(data.user)
            )};
    };



    const logout = () => {
        setToken('');
        localStorage.removeItem('token');
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token, login, logout}}>
            { children }
        </AuthContext.Provider>
    );
};

export {AuthContext, AuthProvider};