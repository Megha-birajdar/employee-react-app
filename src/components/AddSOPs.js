import React, { useState } from "react";
import axios from "axios";

const AddSOPs = () => {
  const [sop, setSOPs] = useState({
    sop_id: "",
    sop_title: "",
    department: { department_id: "" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSOPs({
      ...sop,
      [name]: value,
    });
    //console.log("employee", employee);
  };
  const handleSubmit = async (e) => {
    //e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/sops", sop);
      alert("New sops added successfully!");
      // Optionally, you can reset the form after submission
      setSOPs({
        sop_id: "",
        sop_title: "",
        department: { department_id: "" },
      });
    } catch (error) {
      console.error("Error adding sop:", error);
    }
  };

  return (
    <div>
      <h2>Add New SOPs</h2>
      <form onSubmit={() => handleSubmit()}>
        <label>
          SOP ID:
          <input
            type="text"
            name="sop_id"
            value={sop.sop_id}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          SOP Title:
          <input
            type="text"
            name="sop_title"
            value={sop.sop_title}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Department ID:
          <input
            type="text"
            name="department_id"
            value={sop.department.department_id}
            onChange={(e) =>
              setSOPs({
                ...sop,
                department: { department_id: e.target.value },
              })
            }
          />
        </label>
        <br />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default AddSOPs;
