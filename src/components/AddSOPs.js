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
      <h2 className="text-blue-600">Add New SOP</h2>
      <form onSubmit={handleSubmit}>
        <label className="font-bold">
          SOP ID: </label>
        <input className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400"
          type="text"
          name="sop_id"
          value={sop.sop_id}
          onChange={handleChange}
        />
        <br />
        <label className="font-bold">
          SOP Title:</label>
        <input className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400"
          type="text"
          name="sop_title"
          value={sop.sop_title}
          onChange={handleChange}
        />
        <br />
        <label className="font-bold">
          Department ID:   </label>
        <input className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400"
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
        <br />
        <button className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 font-bold text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400"
          type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddSOPs;
