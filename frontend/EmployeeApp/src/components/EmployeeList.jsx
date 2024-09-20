import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/employees');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEmployees(employees.filter(employee => employee._id !== id));
      } else {
        throw new Error('Failed to delete the employee');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  // Filter employees based on search query
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.mobile.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-fluid bg-light" style={{height:'100vh'}}>
    <Dashboard/>
    <div className="container ">
      <h2>Employee List</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search employees..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <table className="table">
        <thead>
          <tr>
            <th>#</th> {/* Sequential numbering */}
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Created At</th> {/* Added Created At column */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee, index) => (
            <tr key={employee._id}>
              <td>{index + 1}</td> {/* Index + 1 for sequential numbering */}
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobile}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.course}</td>
              <td>{new Date(employee.createdAt).toLocaleDateString()}</td> {/* Format createdAt */}
              <td>
                <Link to={`/edit-employee/${employee._id}`} className="btn btn-primary btn-sm">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(employee._id)}
                  className="btn btn-danger btn-sm ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default EmployeeList;
