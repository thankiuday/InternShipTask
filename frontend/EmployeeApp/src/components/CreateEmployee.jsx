import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './Dashboard';

const CreateEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: ''
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', employeeData.name);
    formData.append('email', employeeData.email);
    formData.append('mobile', employeeData.mobile);
    formData.append('designation', employeeData.designation);
    formData.append('gender', employeeData.gender);
    formData.append('course', employeeData.course);
    formData.append('image', image);

    try {
        const response = await fetch('http://localhost:5000/api/create-employee', {
            method: 'POST',
            body: formData, // Send FormData for file upload
          });
    
          if (response.ok) {
            alert('Employee created successfully');
            navigate('/employee'); // Redirect to employee list
          } else {
            const error = await response.json();
            alert('Error: ' + error.message);
          }
    } catch (error) {
      console.error('Error creating employee', error);
    }
  };

  return (
    <div className="container-fluid bg-light" style={{height:'100vh'}}>
      <Dashboard/>
    <div className="container mt-4">
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label className='ms-3 fs-5 fw-bold'>Name</label>
          <input
            type="text"
            name="name"
            value={employeeData.name}
            onChange={handleChange}
            className="form-control m-3"
            required
          />
        </div>
        <div className="form-group m-3">
          <label className='gs-5 fw-bold'>Email</label>
          <input
            type="email"
            name="email"
            value={employeeData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group m-3">
          <label className='gs-5 fw-bold'>Mobile No</label>
          <input
            type="text"
            name="mobile"
            value={employeeData.mobile}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group m-3">
          <label className='gs-5 fw-bold'>Designation</label>
          <input
            type="text"
            name="designation"
            value={employeeData.designation}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group m-3">
          <label className='gs-5 fw-bold'>Gender</label>
          <div>
            <label className='m-3 fs-5 fw-bold'>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
                required
              /> Male
            </label>
            <label className='m-3 fs-5 fw-bold'>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleChange}
                required
              /> Female
            </label>
          </div>
        </div>
        <div className="form-group m-3">
          <label className='fs-5 fw-bold'>Course</label>
          <input
            type="text"
            name="course"
            value={employeeData.course}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group m-3">
          <label className='gs-5 fw-bold'>Upload Image</label>
          <input
            type="file"
            name="image"
            accept=".jpg,.png"
            onChange={handleImageChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary m-3">Create Employee</button>
      </form>
    </div>
    </div>
  );
};

export default CreateEmployee;
