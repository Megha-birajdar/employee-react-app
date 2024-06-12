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
                    <h1 className="text-blue-600">List Of All Departments</h1>
                    <table className="table table-striped table-bordered border-black">
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
                                        <button className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 font-bold text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400" onClick={() => handleDepartmentClick(department.department_id)}>
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
