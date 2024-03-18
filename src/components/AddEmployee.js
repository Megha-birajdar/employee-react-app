import React, { useState } from "react";
import axios from "axios";

const AddEmployee = ({ onAdd }) => {
  const [employee, setEmployee] = useState({
    employee_name: "",
    start_date: "",
    end_date: "",
    department_id: "",
    completed: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/employees",
        employee
      );
      onAdd(response.data);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Employee Name:</label>
          <input
            type="text"
            name="employee_name"
            value={employee.employee_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="start_date"
            value={employee.start_date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="end_date"
            value={employee.end_date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Department ID:</label>
          <input
            type="text"
            name="department_id"
            value={employee.department_id}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
