import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateEmployee = ({ employee_id, onClose }) => {
  const [employee, updateEmployee] = useState({
    employee_name: "",
    start_date: "",
    end_date: "",
    department_id: "",
    completed: false
  });

  useEffect(() => {
    // Fetch employee data based on employeeId and pre-fill the form
    axios
      .get(`http://localhost:8080/api/employees/${employee_id}`)
      .then((response) => {
        updateEmployee(response.data);
      })
      .catch((error) => console.error("Error fetching employee data:", error));
  }, [employee_id]);

  const handleChange = (e) => {
    updateEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit =  async(e) => {
    e.preventDefault();
    // Implement logic to update employee data
   try{
    await axios
      .put(`http://localhost:8080/api/employees/${employee_id}`, employee)
      .then(() => {
        console.log("Employee data updated successfully");
        onClose(); // Close the update form
      })
    }catch (error) {
         console.error("Error updating employee data:", error);
    }
  };

  return (
    <div>
      <h2>Update Employee</h2>
      <form onSubmit={()=>handleSubmit()}>
        <div>
          <label htmlFor="employee_name">Employee Name:</label>
          <input
            type="text"
            id="employee_name"
            name="employee_name"
            value={employee.employee_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="start_date">Start Date:</label>
          <input
           type="date"
           name="start_date"
           value={employee.start_date}
           onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="end_date">End Date:</label>
          <input
            type="date"
            name="end_date"
            value={employee.end_date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="department_id">Department ID:</label>
          <input
            type="text"
            id="department_id"
            name="department_id"
            value={employee.department_id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="completed">Training Status:</label>
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={employee.completed}
            onChange={() =>
                updateEmployee({ ...employee, completed: !employee.completed })
            }
          />
        </div>
        <button type="submit">Submit</button>
        <button onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
