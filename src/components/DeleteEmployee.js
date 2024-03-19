import React, { useState } from "react";
import axios from "axios";

const DeleteEmployee = ({ employee_id, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      // Send a DELETE request to your backend API to delete the employee
      await axios.delete(`http://localhost:8080/api/employees/${employee_id}`);
      // If deletion is successful, call the onDelete callback
      onDelete(employee_id);
    } catch (error) {
      console.error("Error deleting employee:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleDelete} disabled={loading}>
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteEmployee;
