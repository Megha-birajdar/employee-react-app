import React, { useState } from 'react';
import axios from 'axios';

function AddSOPs() {
  const [sopId, setSopId] = useState('');
  const [title, setTitle] = useState('');
 
  const [deptId, setDeptId] = useState([{ department_id: '', dept_name: '' }]);

  const handleDepartmentChange = (index, event) => {
    const values = [...deptId];
    values[index][event.target.name] = event.target.value;
    setDeptId(values);
  };

  const addDepartmentFields = () => {
    setDeptId([...deptId, { department_id: '', dept_name: '' }]);
  };

  const removeDepartmentFields = index => {
    const values = [...deptId];
    values.splice(index, 1);
    setDeptId(values);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      sop_id: sopId,
      sop_title: title,
      departments: deptId,
      employees: []
    };
    console.log("megha",formData);
    try {
    
      await axios.post("http://localhost:8080/api/sops", formData);
      alert("New sops added successfully!");
      // Optionally, you can reset the form after submission
      setSopId('');
      setDeptId([{ department_id: '', dept_name: '' }]);
      setTitle('');
    } catch (error) {
      console.error("Error adding sop:", error);
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        SOP ID:
        <input type="text" value={sopId} onChange={(e) => setSopId(e.target.value)} />
      </label>
      <br />
      <label>
        SOP Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <br />
      {deptId.map((department, index) => (
        <div key={index}>
          <label>
            Department ID:
            <input type="text" name="department_id" value={department.department_id} onChange={event => handleDepartmentChange(index, event)} />
          </label>
          
          <button type="button" onClick={() => removeDepartmentFields(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={addDepartmentFields}>Add Department</button>

      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
export default AddSOPs;

