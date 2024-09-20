// /src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/Login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setErrorMessage] = useState('')
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the token to localStorage or cookies
        localStorage.setItem('token', data.token);
        // Redirect to the dashboard or home page after successful login
        navigate('/dashboard');
      } else {
        setErrorMessage(data.message || 'Invalid login credentials');
        alert("Invalid Login Details")
      }
    } catch (error) {
      console.error('Login Error', error);
      setErrorMessage('Server error, please try again later.');
    }

  };

  return (
    <section className="vh-100 gradient-custom">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className=" formBody card bg-transparent text-white" style={{"borderRadius": "1rem"}}>
          <div className="card-body p-5 text-center">
            <div className="md-5 mt-md-4 pb-5">
              <h2 className="fw-bold mb-2 text-white ">Employee<span className='text-primary'>Management!</span></h2>
              <p className="mb-5 fs-5 text-light">Please enter your username and password!</p>
              {/* calling handle submit function */}
              <form onSubmit={submitHandler}>
              <div className="form-outline form-white mb-4">
              <label className='fs-2'>Email</label>
          <input
            type="email"
            className="form-control fs-5 fw-bold"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
              </div>
              <div data-mdb-input-init className="form-outline form-white mb-4">
              <label  className='fs-2'>Password</label>
          <input
            type="password"
            className="form-control fs-5 fw-bold"
            value={password}
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
              </div>
              <button type='submit' data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-light btn-lg px-5 login-btn" 
              >Login</button>
              </form>
              {/* end of form tag */}
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  );
};

export default Login;

