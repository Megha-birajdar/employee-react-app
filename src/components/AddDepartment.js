import React, { useState } from "react";
import axios from "axios";

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    department_id: "",
    dept_name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({
      ...department,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    //e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/departments", department);
      alert("Department added successfully!");
      setDepartment({
        department_id: "",
        dept_name: "",
      });
    } catch (error) {
      console.error("Error saving department:", error);
    }
  };
  return (
    <div>
      <h2>Add New Department</h2>
      <form onSubmit={() => handleSubmit()}>
        <label>
          Department ID:
          <input
            type="text"
            name="department_id"
            value={department.department_id}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Department Name:
          <input
            type="text"
            name="dept_name"
            value={department.dept_name}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
export default AddDepartment;
