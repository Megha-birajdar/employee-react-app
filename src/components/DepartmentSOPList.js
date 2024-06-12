import React, { useState, useEffect } from "react";
import axios from "axios";

const DepartmentSOPList = () => {
  const [sops, setSops] = useState([]);
  const department_id = JSON.parse(localStorage.getItem('departmentId'));
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/departments/${department_id}/sops`)

      .then((response) => setSops(response.data))

      .catch((error) => console.error("Error fetching SOPs:", error));
  }, [department_id]);

  return (
    <div>
      <h2>SOPs for Department ID: {department_id} </h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>S_NO.</th>
            <th>SOP ID</th>
            <th>SOP Title</th>
          </tr>
        </thead>
        <tbody>
          {sops.map((sop, index) => (
            <tr key={sop.sop_id}>
              <td>{index + 1}</td>
              <td>{sop.sop_id}</td>
              <td>{sop.sop_title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentSOPList;
