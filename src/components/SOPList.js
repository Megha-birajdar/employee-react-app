import React, { useState, useEffect } from "react";
import axios from "axios";
import SopEmployees from "./SOPEmployees";

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
  return (
    <div>
      {showSops && (
        <>
          <h1 className="text-blue-600">List Of All SOPs</h1>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>S_NO.</th>
                <th>SOP ID</th>
                <th>SOP Title</th>
                <th>SOP Department</th>
              </tr>
            </thead>
            <tbody>
              {sops.map((sop, index) => (
                <tr key={sop.sop_id}>
                  <td>{index + 1}</td>
                  <td>
                    <button className="border-2 border-black rounded-lg px-2 m-1" onClick={() => handleSopClick(sop.sop_id)}>
                      {sop.sop_id}
                    </button>
                  </td>
                  <td>{sop.sop_title}</td>
                  <td>{sop.department.dept_name}</td>
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
