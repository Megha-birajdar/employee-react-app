import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SOPList from "./SOPList";
import SaveEmployee from "./SaveEmployee";
import UpdateEmployee from "./UpdateEmployee";
import { useDispatch } from "react-redux";
import { setEmployeeId } from "../Utils/employeeConfig";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [showEmployees, setShowEmployees] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [addNewEmployee, setAddNewEmployee] = useState(false);
  const [updateNewEmployee, setUpdateNewEmployee] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/employees")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const handleDepartmentClick = async (department_id) => {
    setShowEmployees(false);
    setSelectedDepartment(department_id);
  };

  const handleSaveEmployee = () => {
    // Implement logic for adding an employee
    setAddNewEmployee(true);
  };

  const handleUpdateEmployee = (employee_id) => {
    // Implement logic for updating an employee
    console.log("Update employee logic here for employee ID:", employee_id);
    setUpdateNewEmployee(true);
    dispatch(setEmployeeId(employee_id));
    navigate("/UpdateEmployee");
  };

  const handleDeleteEmployee = (employee_id) => {
    // Implement logic for deleting an employee
    console.log("Delete employee logic here for employee ID:", employee_id);
  };

  return (
    <div>
      {showEmployees && (
        <>
          <h2>EmployeeList</h2>
          <button onClick={handleSaveEmployee}>Add Employee</button>
          {addNewEmployee && <SaveEmployee />}
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Department ID</th>
                <th>Training Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.employee_id}>
                  <td>{employee.employee_id}</td>
                  <td>{employee.employee_name}</td>
                  <td>{employee.start_date}</td>
                  <td>{employee.end_date}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleDepartmentClick(employee.department.department_id)
                      }
                    >
                      {employee.department.department_id}
                    </button>
                  </td>
                  <td>{employee.completed ? "✅" : "❌"}</td>
                  <td>
                    <button
                      onClick={() => handleUpdateEmployee(employee.employee_id)}
                    >
                      Update
                    </button>
                    {/* {updateNewEmployee && (
                      <UpdateEmployee employee_id={employee.employee_id} />
                    )} */}
                    <button
                      onClick={() => handleDeleteEmployee(employee.employee_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {!showEmployees && <SOPList department_id={selectedDepartment} />}
    </div>
  );
};

export default EmployeeList;


