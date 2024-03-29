import React, { useState, useEffect } from "react";
import axios from "axios";
import SopEmployees from "./SOPEmployees";
import { Link } from "react-router-dom";

const SOPList = () => {
  const [sops, setSops] = useState([]);
  const [showSops, setShowSops] = useState(true);
  const [selectedSop, setSelectedSop] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/sops`)
      .then((response) => setSops(response.data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const handleSopClick = async (sop_id) => {
    setShowSops(false);
    setSelectedSop(sop_id);
  };
const sopPdf={
  "S001": "1BnoSDbyOi_yWWus1s_l6CpIVZFWgeS8P",
  "S002":"1s345Q6-8l58jqvF_X_nsQIx_HobrqgN7"
}
  return (
    <div>
      {showSops && (
        <>
          <h1>List of SOPs</h1>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>SOP ID</th>
                <th>SOP Title</th>
                <th>Departments</th>
              </tr>
            </thead>
            <tbody>
              {sops.map((sop) => (
                <tr key={sop.sop_id}>
                  <td>
                    <button onClick={() => handleSopClick(sop.sop_id)}>{sop.sop_id}</button>
                  </td>
                  <td>
                  <Link to={`https://drive.google.com/file/d/${sopPdf[sop.sop_id]}/view?usp=drive_link`}>{sop.sop_title}</Link>
                  </td>
                  <td>
                    {sop.departments.map((department) => (
                      <li key={department.department_id}>{department.dept_name}</li>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {!showSops && <SopEmployees sop_id={selectedSop} />}
    </div>
  );
};
export default SOPList;





