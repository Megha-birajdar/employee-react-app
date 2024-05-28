import React, { useState, useEffect } from "react";
import axios from "axios";
import DepartmentEmployees from "./DepartmentEmployees";

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [showDepartments, setShowDepartments] = useState(true);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/departments`)
            .then((response) => setDepartments(response.data))
            .catch((error) => console.error("Error fetching employees:", error));
    }, []);

    const handleDepartmentClick = async (department_id) => {
        setShowDepartments(false);
        setSelectedDepartment(department_id);
    };
    return (
        <div>
            {showDepartments && (
                <>
                    <h1>List of Departments</h1>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>S_NO.</th>
                                <th>Department ID</th>
                                <th>Department Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map((department, index) => (
                                <tr key={department.department_id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <button onClick={() => handleDepartmentClick(department.department_id)}>
                                            {department.department_id}
                                        </button>
                                    </td>
                                    <td>{department.dept_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
            {!showDepartments && <DepartmentEmployees department_id={selectedDepartment} />}
        </div>
    );
};
export default DepartmentList;
