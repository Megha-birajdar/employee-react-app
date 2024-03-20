import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const UpdateEmployee = ({ onClose, onUpdate }) => {
  const [employeeData, setEmployeeData] = useState({
    employee_name: "",
    start_date: "",
    end_date: "",
    department: { department_id: "" },
    completed: false,
  });
  const navigate = useNavigate();
  const employee_id = useSelector((store) => store.employeeId.updateEmployeeId);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/employees/${employee_id}`
        );
        setEmployeeData(response.data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };
    fetchEmployeeDetails();
  }, [employee_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((employeeData) => ({
      ...employeeData,
      [name]: value,
    }));
    console.log("employeeData", employeeData);
  };
  const handleButtonClick = () => {
    navigate("/");
  };
  const handleSubmit = async (e) => {
    //e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/api/employees/${employee_id}`,
        employeeData
      );
      alert("Employee updated successfully!");
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };
  return (
    <div>
      <h2>Update Employee</h2>
      <form onSubmit={() => handleSubmit()}>
        <div>
          <label>Employee Name:</label>
          <input
            type="text"
            name="employee_name"
            value={employeeData.employee_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="start_date"
            value={employeeData.start_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="end_date"
            value={employeeData.end_date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Department ID:</label>

          <input
            type="text"
            name="department_id"
            value={employeeData.department.department_id}
            onChange={(e) =>
              setEmployeeData({
                ...employeeData,
                department: { department_id: e.target.value },
              })
            }
          />
        </div>
        <div>
          <label>Training Status:</label>
          <input
            type="checkbox"
            name="completed"
            checked={employeeData.completed}
            onChange={() =>
              setEmployeeData((employeeData) => ({
                ...employeeData,
                completed: !employeeData.completed,
              }))
            }
          />
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
      <button type="button" onClick={handleButtonClick}>
        Go To EmployeeList
      </button>
    </div>
  );
};

export default UpdateEmployee;
