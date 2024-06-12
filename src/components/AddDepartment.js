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
      <h2 className="text-blue-600">Add New Department</h2>
      <form onSubmit={() => handleSubmit()}>
        <label className="font-bold">
          Department ID:</label>
        <input className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400"
          type="text"
          name="department_id"
          value={department.department_id}
          onChange={handleChange}
        />
        <br />
        <label className="font-bold">
          Department Name:  </label>
        <input className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400"
          type="text"
          name="dept_name"
          value={department.dept_name}
          onChange={handleChange}
        />
        <br />
        <button className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 font-bold text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400"
          type="submit">submit</button>
      </form>
    </div>
  );
};
export default AddDepartment;
