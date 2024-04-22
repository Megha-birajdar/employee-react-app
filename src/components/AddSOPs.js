import React, { useState } from "react";
import axios from "axios";

const AddSOPs = () => {
  const [sop, setSop] = useState({
    sop_id: "",
    sop_title: "",
    department: { department_id: "" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSop({
      ...sop,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/sops", sop);
      alert("SOP saved successfully!");
      setSop({
        sop_id: "",
        sop_title: "",
        department: { department_id: "" },
      });
    } catch (error) {
      console.error("Error saving sop:", error);
    }
  };
  return (
    <div>
      <h2>Add New SOP</h2>
      <form onSubmit={handleSubmit}>
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
              setSop({
                ...sop,
                department: { department_id: e.target.value },
              })
            }
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddSOPs;
