import React, { useState } from "react";
import axios from "axios";

const SaveEmployee = () => {
  const [sopId, setSopId] = useState([{ sop_id: "", sop_title: "" }]);
  const [employee, setEmployee] = useState({
    employee_id: "",
    employee_name: "",
    start_date: "",
    end_date: "",
    completed: false,
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
    setEmployee({ ...employee, sops: values }); // Update employee state with updated SOPs
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
      // Optionally, you can reset the form after submission
      setEmployee({
        employee_id: "",
        employee_name: "",
        start_date: "",
        end_date: "",
        completed: false,
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
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Employee ID:
          <input
            type="text"
            name="employee_id"
            value={employee.employee_id}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Employee Name:
          <input
            type="text"
            name="employee_name"
            value={employee.employee_name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Start Date:
          <input
            type="date"
            name="start_date"
            value={employee.start_date}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          End Date:
          <input
            type="date"
            name="end_date"
            value={employee.end_date}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Completed:
          <input
            type="checkbox"
            name="completed"
            checked={employee.completed}
            onChange={(e) =>
              setEmployee({ ...employee, completed: e.target.checked })
            }
          />
        </label>
        <br />
        <label>
          Department ID:
          <input
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
        </label>
        <br />
        {sopId.map((sop, index) => (
          <div key={index}>
            <label>
              SOP ID:
              <input
                type="text"
                name="sop_id"
                value={sop.sop_id}
                onChange={(event) => handleSopChange(index, event)}
              />
            </label>
            <label>
              SOP Title:
              <input
                type="text"
                name="sop_title"
                value={sop.sop_title}
                onChange={(event) => handleSopTitleChange(index, event)}
              />
            </label>
            <button type="button" onClick={() => removeSOPFields(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addSopFields}>
          Add SOP
        </button>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SaveEmployee;
