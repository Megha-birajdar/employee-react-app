import React, { useState } from "react";
import axios from "axios";

const DeleteSop = ({ sop_id }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this sop?"
    );
    if (!confirmDelete) return;

    setLoading(true);
    console.log(sop_id, "megha");
    try {
      await axios.delete(`http://localhost:8080/api/sops/${sop_id}`);
      alert("Sop data deleted successfully!");
    } catch (error) {
      console.error("Error deleting sop:", error);
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

export default DeleteSop;
