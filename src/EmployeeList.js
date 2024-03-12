import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [sops, setSops] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/employees')
            .then(response => setEmployees(response.data))
            .catch(error => console.error('Error fetching employees:', error));
    }, []);

    const handleDepartmentClick = async (department_id) => {
        try {
            // Fetch SOPs related to the selected department
            const response = await axios.get(`http://localhost:8080/api/departments/${department_id}/sops`);
            setSops(response.data);

            // Set the selected department for modal or another component display
            setSelectedDepartment(department_id);
        } catch (error) {
            console.error('Error fetching SOPs:', error);
        }
    };

    return (
        <div>
            <h2>EmployeeList</h2>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th onClick={() => handleDepartmentClick('department_id')}>Department ID</th>
                        <th>Training_Status</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.employee_id}>
                            <td>{employee.employee_id}</td>
                            <td>{employee.employee_name}</td>
                            <td>{employee.start_date}</td>
                            <td>{employee.end_date}</td>
                            <td>
                                <button onClick={() => handleDepartmentClick(employee.department.department_id)}>
                                    {employee.department.department_id}
                                </button>
                            </td>
                            <td>{employee.completed ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal or Another Component for displaying SOPs */}
            {selectedDepartment && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setSelectedDepartment(null)}>&times;</span>
                        <h2>SOPs for Department {selectedDepartment}</h2>
                        <ul>
                            {sops.map(sop => (
                                <li key={sop.sop_id}>{sop.sop_title}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeList;