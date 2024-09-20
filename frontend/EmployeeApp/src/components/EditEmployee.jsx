import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: '',
    image: ''
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/employees/${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setEmployee({
          name: data.name || '',
          email: data.email || '',
          mobile: data.mobile || '',
          designation: data.designation || '',
          gender: data.gender || '',
          course: data.course || '',
        });
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('mobile', employee.mobile);
    formData.append('designation', employee.designation);
    formData.append('gender', employee.gender);
    formData.append('course', employee.course);
    

    try {
      const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const result = await response.json();
      console.log(result.message);
      navigate('/employee'); // Redirect after successful update
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div className="container-fluid bg-light" style={{height:'100vh'}}>
      <Dashboard/>
    <div className="container mt-4">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label className='ms-3 fs-5 fw-bold'>Name</label>
          <input
            type="text"
            name="name"
            value={employee.name}
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
            value={employee.email}
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
            value={employee.mobile}
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
            value={employee.designation}
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
                checked={employee.gender === 'Male'}
                onChange={handleChange}
                required
              /> Male
            </label>
            <label className='m-3 fs-5 fw-bold'>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={employee.gender === 'Female'}
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
            value={employee.course}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary m-3">Update Employee</button>
      </form>
    </div>
    </div>
  );
  
};

export default EditEmployee;
