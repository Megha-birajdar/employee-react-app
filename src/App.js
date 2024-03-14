import React from "react";
import EmployeeList from "./components/EmployeeList";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <h1 className="centered-header">Employees Training Management System</h1>
      <EmployeeList />
    </div>
  );
};

export default App;
