import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const DepartmentEmployees = (props) => {
    const [employees, setEmployees] = useState([]);
    const { department_id } = props;
    const arrayEmployee = useSelector(
        (store) => store.employeeMarks.EmployeeMarks
    );

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/departments/${department_id}/employees`)
            .then((response) => setEmployees(response.data))
            .catch((error) => console.error("Error fetching employees:", error));
    }, [department_id]);

    return (
        <div>
            <h2>EmployeeList</h2>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>S_NO.</th>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Training Status</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={employee.employee_id}>
                            <td>{index + 1}</td>
                            <td>{employee.employee_id}</td>
                            <td>{employee.employee_name}</td>
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

export default DepartmentEmployees;
