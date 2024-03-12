import React from 'react';
import EmployeeList from './EmployeeList';
import SOPList from './SOPList';
import './App.css'; 

const App = () => {
  return (
    <div className="app-container">
      <h2 className="centered-header">Employees Training Management System</h2>
      <EmployeeList />
      <SOPList/>
    </div>
  );
};

export default App;
