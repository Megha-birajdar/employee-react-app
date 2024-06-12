import React, { useState } from "react";
import axios from "axios";

const DeleteEmployee = ({ employee_id, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!confirmDelete) return;

    setLoading(true);
    try {
      await axios.delete(`http://localhost:8080/api/employees/${employee_id}`);
      onDelete(employee_id);
      alert("Employee data deleted successfully!");
    } catch (error) {
      console.error("Error deleting employee:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className="border-2  border-black rounded-md text-red-600 px-2 m-1" onClick={handleDelete} disabled={loading}>
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteEmployee;
