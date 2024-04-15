import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SOPList from "./SOPList";
import SaveEmployee from "./SaveEmployee";
import { useDispatch, useSelector } from "react-redux";
import { setEmployeeId } from "../Utils/employeeConfig";
import DeleteEmployee from "./DeleteEmployee";
import AddDepartment from "./AddDepartment";
import AddSOPs from "./AddSOPs";
import EmployeeSOPs from "./EmployeeSOPs";
import DepartmentSOPList from "./DepartmentSOPList";
import { setEmployeeMarks } from "../Utils/employeeMarks";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [showEmployees, setShowEmployees] = useState(true);
  const [showEmployeesop, setShowEmployeesop] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [addNewEmployee, setAddNewEmployee] = useState(false);
  const [updateNewEmployee, setUpdateNewEmployee] = useState(false);
  const [addNewDepartment, setAddNewDepartment] = useState(false);
  const [addNewSop, setAddNewSop] = useState(false);
  const [goToSop, setGoToSop] = useState(false);
  const arrayEmployee = useSelector(
    (store) => store.employeeMarks.EmployeeMarks
  );
  console.log("arrayEmployee", arrayEmployee);
  // const isCompleted =
  //   arrayEmployee.filter((data) => data.employee_id === "E002").length >
  //   (0).map((data1) => data1.marks).every((marks) => marks >= 80);
  // // const isCompleted =
  // //   arrayEmployee.filter((data) => data.employee_id === "E002").length > 0;

  // console.log("arrayEmployee1", isCompleted);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/employees")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/empsopmarks`)
      .then((response) => dispatch(setEmployeeMarks(response.data)))
      .catch((error) => console.error("Error fetching marks:", error));
  }, []);
  const handleDepartmentClick = async (department_id) => {
    setShowEmployees(false);
    setSelectedDepartment(department_id);
  };
  const handleEmployeeClick = async (employee_id) => {
    console.log("employee", employee_id);
    setShowEmployeesop(true);
    setShowEmployees(false);
    setSelectedEmployee(employee_id);
  };

  const handleSaveEmployee = () => {
    // Implement logic for adding an employee
    setAddNewEmployee(true);
  };
  const handleAddDepartment = () => {
    setAddNewDepartment(true);
  };
  const handleAddSOPs = () => {
    setAddNewSop(true);
  };
  const handleSOPList = () => {
    setGoToSop(true);
  };

  const handleUpdateEmployee = (employee_id) => {
    // Implement logic for updating an employee
    console.log("Update employee logic here for employee ID:", employee_id);
    setUpdateNewEmployee(true);
    dispatch(setEmployeeId(employee_id));
    navigate("/UpdateEmployee");
  };

  const handleDeleteEmployee = (employee_id) => {
    console.log("Delete employee logic here for employee ID:", employee_id);
    setEmployees(
      employees.filter((employee) => employee.employee_id !== employee_id)
    );
  };

  return (
    <div>
      {showEmployees && (
        <>
          <button onClick={handleSaveEmployee}>Add Employee</button>
          {addNewEmployee && <SaveEmployee />}
          <button onClick={handleAddDepartment}>Add Department</button>
          {addNewDepartment && <AddDepartment />}
          <button onClick={handleAddSOPs}>Add SOPs</button>
          {addNewSop && <AddSOPs />}
          <button onClick={handleSOPList}>Go To SOPList</button>
          {goToSop && <SOPList />}
          <h2>EmployeeList</h2>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Previous_Date</th>
                <th>Upcoming_Date</th>
                <th>Department ID</th>
                <th>Training Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.employee_id}>
                  <td>
                    <button
                      onClick={() => {
                        setSelectedEmployee(employee.employee_id);
                        handleEmployeeClick(employee.employee_id);
                      }}
                    >
                      {" "}
                      {employee.employee_id}
                    </button>
                  </td>
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
                  <td>
                    {arrayEmployee.filter(
                      (data) => data.employee_id === employee.employee_id
                    ).length > 0 &&
                    arrayEmployee
                      .filter(
                        (data) => data?.employee_id === employee.employee_id
                      )
                      .map((data1) => data1?.marks)
                      .every((marks) => marks >= 80)
                      ? "✅"
                      : "❌"}
                  </td>
                  <td>
                    <button
                      onClick={() => handleUpdateEmployee(employee.employee_id)}
                    >
                      Update
                    </button>
                    <DeleteEmployee
                      employee_id={employee.employee_id}
                      onDelete={handleDeleteEmployee}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {!showEmployees && (
        <DepartmentSOPList department_id={selectedDepartment} />
      )}
      {showEmployeesop && <EmployeeSOPs employee_id={selectedEmployee} />}
    </div>
  );
};

export default EmployeeList;
