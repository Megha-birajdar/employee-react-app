import React from "react";
import EmployeeList from "./components/EmployeeList";
import "./App.css";
import SaveEmployee from "./components/SaveEmployee";
import UpdateEmployee from "./components/UpdateEmployee";

const App = () => {
  return (
    <div className="app-container">
      <h1 className="centered-header">Employees Training Management System</h1>
      <EmployeeList />
      <UpdateEmployee/>
    </div>
  );
};

export default App;
