import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SOPList = () => {
  const [sops, setSops] = useState([]);

  useEffect(() => {
    // Replace the URL with your Spring Boot API endpoint for fetching SOPs
    axios.get('http://localhost:8080/api/sops')
      .then(response => setSops(response.data))
      .catch(error => console.error('Error fetching SOPs:', error));
  }, []);

  return (
    <div>
      <h2>SOP List</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>SOP ID</th>
            <th>SOP Title</th>
            <th>Department ID</th>
          </tr>
        </thead>
        <tbody>
          {sops.map(sop => (
            <tr key={sop.sop_id}>
              <td>{sop.sop_id}</td>
              <td>{sop.sop_title}</td>
              <td>{sop.department ? sop.department.department_id : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SOPList;