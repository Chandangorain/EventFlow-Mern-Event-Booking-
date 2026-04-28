import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaTicketAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

       const handleLogout = () => {
        logout();
        navigate('/login');
    };

    
}

export default Navbar
