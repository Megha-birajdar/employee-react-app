import React, { useState } from "react";
import axios from "axios";

const SaveEmployee = () => {
  const [sopId, setSopId] = useState([{ sop_id: "", sop_title: "" }]);
  const [employee, setEmployee] = useState({
    employee_id: "",
    employee_name: "",
    start_date: "",
    end_date: "",
    department: { department_id: "" },
    sops: sopId,
  });

  const handleSopChange = (index, event) => {
    const values = [...sopId];
    values[index][event.target.name] = event.target.value;
    setSopId(values);
    setEmployee({ ...employee, sops: values });
  };

  const handleSopTitleChange = (index, event) => {
    const values = [...sopId];
    values[index][event.target.name] = event.target.value;
    setSopId(values);
    setEmployee({ ...employee, sops: values });
  };

  const addSopFields = () => {
    setSopId([...sopId, { sop_id: "", sop_title: "" }]);
  };

  const removeSOPFields = (index) => {
    const values = [...sopId];
    values.splice(index, 1);
    setSopId(values);
    setEmployee({ ...employee, sops: values });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/employees", employee);
      alert("Employee saved successfully!");
      setEmployee({
        employee_id: "",
        employee_name: "",
        start_date: "",
        end_date: "",
        department: { department_id: "" },
        sops: [],
      });
      setSopId([{ sop_id: "", sop_title: "" }]);
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  return (
    <div>
      <h2 className="text-blue-600">Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <label className="font-bold">
          Employee ID:</label>
        <input className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 font-bold text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400"
          type="text"
          name="employee_id"
          value={employee.employee_id}
          onChange={handleChange}
        />
        <br />
        <label className="font-bold">
          Employee Name: </label>
        <input className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 font-bold text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400"
          type="text"
          name="employee_name"
          value={employee.employee_name}
          onChange={handleChange}
        />
        <br />
        <label className="font-bold">
          Start Date: </label>
        <input className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 font-bold text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400"
          type="date"
          name="start_date"
          value={employee.start_date}
          onChange={handleChange}
        />
        <br />
        <label className="font-bold">
          End Date:</label>
        <input className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 font-bold text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400"
          type="date"
          name="end_date"
          value={employee.end_date}
          onChange={handleChange}
        />
        <br />
        <label className="font-bold">
          Department ID: </label>
        <input className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 font-bold text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400"
          type="text"
          name="department_id"
          value={employee.department.department_id}
          onChange={(e) =>
            setEmployee({
              ...employee,
              department: { department_id: e.target.value },
            })
          }
        />
        <br />
        {sopId.map((sop, index) => (
          <div key={index}>
            <label className="font-bold" >
              SOP ID:</label>
            <input className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 font-bold text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400"
              type="text"
              name="sop_id"
              value={sop.sop_id}
              onChange={(event) => handleSopChange(index, event)}
            />
            <label className="font-bold pl-2">
              SOP Title:</label>
            <input className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 font-bold text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400"
              type="text"
              name="sop_title"
              value={sop.sop_title}
              onChange={(event) => handleSopTitleChange(index, event)}
            />
            <button className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 font-bold text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400" type="button" onClick={() => removeSOPFields(index)}>
              Remove
            </button>
          </div>
        ))}
        <button className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 font-bold text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400" type="button" onClick={addSopFields}>
          Add SOP
        </button>
        <br />
        <button className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 font-bold text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SaveEmployee;
