// /src/App.js
import React from 'react';
import { BrowserRouter as Router,Routes, Route,} from 'react-router-dom';
import Login from './components/Login.jsx'
import CreateEmployee from './components/CreateEmployee.jsx';
import EmployeeList from './components/EmployeeList.jsx';
import EditEmployee from './components/EditEmployee.jsx';
import MainIndex from './components/MainIndex.jsx';
const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login/>} exact /> 
      <Route path="/dashboard" element={<MainIndex/>} />
      <Route path="/create-employee" element={<CreateEmployee />} />
      <Route path="/employee" element={<EmployeeList />} />
      <Route path="/edit-employee/:id" element={<EditEmployee />} />
      </Routes>
    </Router>
  );
};

export default App;
