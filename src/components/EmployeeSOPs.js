import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeSOPs = ({ employee_id }) => {
  const [sops, setSOPs] = useState([]);
  
  useEffect(() => {
    const fetchSOPs = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/employees/${employee_id}/sops`);
        setSOPs(response.data);
      } catch (error) {
        console.error("Error fetching SOPs:", error);
      }
    };

    fetchSOPs();
  }, [employee_id]);

  return (
    <div>
      <h2>SOPs for Employee ID: {employee_id}</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>SOP ID</th>
            <th>SOP Title</th>
           </tr>
        </thead>
        <tbody>
          {sops.map((sop) => (
            <tr key={sop.sop_id}>
              <td>{sop.sop_id}</td>
              <td>{sop.sop_title}</td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeSOPs;
