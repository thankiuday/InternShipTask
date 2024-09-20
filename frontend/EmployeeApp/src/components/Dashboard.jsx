import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainIndex from './MainIndex';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the token from localStorage
    const token = localStorage.getItem('token');

    if (token) {
      try {
        // Manually decode the token to get user information
        const base64Url = token.split('.')[1]; // Get the payload part
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedPayload = JSON.parse(atob(base64)); // Decode and parse the payload

        const userId = decodedPayload.id; // Get the user ID from the payload

        // Fetch the user details using the userId
        fetch(`http://localhost:5000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in request headers for authentication
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setUser(data); // Set the user data fetched from the backend
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      } catch (error) {
        console.error('Error decoding token', error);
      }
    } else {
      // If no token, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Remove the token from localStorage and navigate to login page
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="container">
    <nav class="navbar navbar-expand-lg fs-4 navbar-light bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand text-danger fs-4 fw-bold" href="#">Employee<span className='text-primary'>Management</span>  </a>
      <button
        data-mdb-collapse-init
        class="navbar-toggler"
        type="button"
        data-mdb-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav mx-auto fw-bold"> 
          <Link className="nav-link me-5" to="/dashboard">Dashboard</Link>
          <Link className="nav-link me-5" to="/employee">Employee List</Link>
          <Link className="nav-link me-5" to="/create-employee">Create Employee</Link>
          {user ? (
                  <span className="nav-link">    {user.email || 'No Email Found'}</span>
                ) : (
                  <span className="nav-link">Loading...</span>
                )}
           <button className="btn btn-link nav-link text-danger" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  </nav>
  </div>
  );
};

export default Dashboard;
    