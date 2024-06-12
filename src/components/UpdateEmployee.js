import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const UpdateEmployee = ({ onClose, onUpdate }) => {
  const [employeeData, setEmployeeData] = useState({
    employee_name: "",
    start_date: "",
    end_date: "",
    department: { department_id: "" },
    sops: [{ sop_id: "", sop_title: "" }],
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
  console.log("megha", employeeData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((employeeData) => ({
      ...employeeData,
      [name]: value,
    }));
    console.log("employeeData", employeeData);
  };
  const handleSopChange = (index, event) => {
    const values = [...employeeData.sops];
    values[index][event.target.name] = event.target.value;
    setEmployeeData({ ...employeeData, sops: values });
  };

  const handleSopTitleChange = (index, event) => {
    const values = [...employeeData.sops];
    values[index][event.target.name] = event.target.value;
    setEmployeeData({ ...employeeData, sops: values });
  };

  const addSopFields = () => {
    setEmployeeData((prevState) => ({
      ...prevState,
      sops: [...prevState.sops, { sop_id: "", sop_title: "" }],
    }));
  };

  const removeSOPFields = (index) => {
    const values = [...employeeData.sops];
    values.splice(index, 1);
    setEmployeeData({ ...employeeData, sops: values });
  };

  const handleButtonClick = () => {
    navigate("/employee/employeeList");
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
          <label className="font-bold">Employee Name:</label>
          <input className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 text-gray-900 ring-1 ring-inset  ring-black placeholder:text-gray-400"
            type="text"
            name="employee_name"
            value={employeeData.employee_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="font-bold">Start Date:</label>
          <input className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 text-gray-900 ring-1 ring-inset  ring-black placeholder:text-gray-400"
            type="date"
            name="start_date"
            value={employeeData.start_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="font-bold">End Date:</label>
          <input className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 text-gray-900 ring-1 ring-inset  ring-black placeholder:text-gray-400"
            type="date"
            name="end_date"
            value={employeeData.end_date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="font-bold">Department ID:</label>
          <input className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 text-gray-900 ring-1 ring-inset ring-black  placeholder:text-gray-400"
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
          {employeeData?.sops?.map((sop, index) => (
            <div key={index}>
              <label className="font-bold">SOP ID: </label>
              <input className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 text-gray-900 ring-1 ring-inset  ring-black placeholder:text-gray-400"
                type="text"
                name="sop_id"
                value={sop.sop_id}
                onChange={(event) => handleSopChange(index, event)}
              />
              <label className="font-bold pl-2">
                SOP Title:</label>
              <input className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400"
                type="text"
                name="sop_title"
                value={sop.sop_title}
                onChange={(event) => handleSopTitleChange(index, event)}
              />
              <button className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 font-bold text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400"
                type="button" onClick={() => removeSOPFields(index)}>
                Remove
              </button>
            </div>
          ))}
          <button className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 font-bold text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400"
            type="button"
            onClick={addSopFields}>
            Add SOP
          </button>
        </div>
        <button className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 font-bold text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400"
          type="submit">
          Submit
        </button>
      </form>
      <button className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 font-bold text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400"
        type="button" onClick={handleButtonClick}>
        Go To EmployeeList
      </button>
    </div>
  );
};

export default UpdateEmployee;
