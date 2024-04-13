import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const UpdateEmployee = ({ onClose, onUpdate }) => {
  const [sopId, setSopId] = useState([{ sop_id: "", sop_title: "" }]);
  const [employeeData, setEmployeeData] = useState({
    employee_name: "",
    start_date: "",
    end_date: "",
    department: { department_id: "" },
    completed: false,
    sops: sopId,
});
  const navigate = useNavigate();
  const employee_id = useSelector((store) => store.employeeId.updateEmployeeId);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/employees/${employee_id}`
        );
        setEmployeeData(response.data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };
    fetchEmployeeDetails();
  }, [employee_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((employeeData) => ({
      ...employeeData,
      [name]: value,
    }));
    console.log("employeeData", employeeData);
  };
  const handleSopChange = (index, event) => {
    const values = [...sopId];
    values[index][event.target.name] = event.target.value;
    setSopId(values);
    setEmployeeData({ ...employeeData, sops: values });
  };

  const handleSopTitleChange = (index, event) => {
    const values = [...sopId];
    values[index][event.target.name] = event.target.value;
    setSopId(values);
    setEmployeeData({ ...employeeData, sops: values });
  };

  const addSopFields = () => {
    setSopId([...sopId, { sop_id: "", sop_title: "" }]);
  };

  const removeSOPFields = (index) => {
    const values = [...sopId];
    values.splice(index, 1);
    setSopId(values);
    setEmployeeData({ ...employeeData, sops: values }); // Update employee state with updated SOPs
  };

  const handleButtonClick = () => {
    navigate("/");
  };
  const handleSubmit = async (e) => {
    //e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/api/employees/${employee_id}`,
        employeeData
      );
      alert("Employee updated successfully!");
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };
  return (
    <div>
      <h2>Update Employee</h2>
      <form onSubmit={() => handleSubmit()}>
        <div>
          <label>Employee Name:</label>
          <input
            type="text"
            name="employee_name"
            value={employeeData.employee_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="start_date"
            value={employeeData.start_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="end_date"
            value={employeeData.end_date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Department ID:</label>

          <input
            type="text"
            name="department_id"
            value={employeeData.department.department_id}
            onChange={(e) =>
              setEmployeeData({
                ...employeeData,
                department: { department_id: e.target.value },
              })
            }
          />
        </div>
        <div>
          <label>Training Status:</label>
          <input
            type="checkbox"
            name="completed"
            checked={employeeData.completed}
            onChange={() =>
              setEmployeeData((employeeData) => ({
                ...employeeData,
                completed: !employeeData.completed,
              }))
            }
          />
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
        </div>
      <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
      <button type="button" onClick={handleButtonClick}>
        Go To EmployeeList
      </button>
    </div>
  );
};

export default UpdateEmployee;
