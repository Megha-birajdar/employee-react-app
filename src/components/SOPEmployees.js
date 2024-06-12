import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const SopEmployees = (props) => {
  const [employees, setEmployees] = useState([]);
  const { sop_id } = props;
  const arrayEmployee = useSelector(
    (store) => store.employeeMarks.EmployeeMarks
  );

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/sops/${sop_id}/employees`)
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, [sop_id]);

  return (
    <div>
      <h2>EmployeeList</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>S_NO.</th>
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
          {employees.map((employee, index) => (
            <tr key={employee.employee_id}>
              <td>{index + 1}</td>
              <td>{employee.employee_id}</td>
              <td>{employee.employee_name}</td>
              <td>{employee.start_date}</td>
              <td>{employee.end_date}</td>
              <td>{employee.department.department_id}</td>
              <td>
                {arrayEmployee.filter((data) => data.employee_id === employee.employee_id)
                  .length > 0 &&
                  arrayEmployee
                    .filter(
                      (data) => data?.employee_id === employee.employee_id
                    )
                    .map((data1) => data1?.marks)
                    .every((marks) => marks >= 80)
                  ? "✅"
                  : "❌"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SopEmployees;

