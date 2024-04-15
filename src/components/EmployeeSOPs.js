import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SopEmployees from "./SOPEmployees";

const EmployeeSOPs = ({ employee_id }) => {
  const [sops, setSOPs] = useState([]);
  const [sopId, setSopId] = useState("");
  const [marks, setMarks] = useState(0);
  const [sopMarks, setSopMarks] = useState([]);
  const [sopMarksId, setSopMarksId] = useState();
  const [showSops, setShowSops] = useState(true);
  const [selectedSop, setSelectedSop] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/empsopmarks`)
      .then((response) => setSopMarks(response.data))
      .catch((error) => console.error("Error fetching marks:", error));
  }, []);
  console.log("sopMarks", sopMarks);
  const handleSopClick = async (sop_id) => {
    setShowSops(false);
    setSelectedSop(sop_id);
  };
useEffect(() => {
    const fetchSOPs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/employees/${employee_id}/sops`
        );
        setSOPs(response.data);
      } catch (error) {
        console.error("Error fetching SOPs:", error);
      }
    };

    fetchSOPs();
  }, [employee_id]);
  const filteredResults = sopMarks.filter(
    (item) => item.employee_id === employee_id
  );
  console.log(
    "sopMarks123",
    filteredResults.find((sopid) => sopid.sop_id === "S001")
  );

  const handleSubmit = async (e) => {
    if (!sopMarksId) {
      try {
        await axios.post("http://localhost:8080/api/empsopmarks", {
          employee_id: employee_id,

          sop_id: sopId,

          marks: marks,
        });
        alert("Marks added successfully!");
        setSopId("");
        setMarks(0);
      } catch (error) {
        console.error("Error adding marks:", error);
      }
    } else {
      try {
        await axios.put(`http://localhost:8080/api/empsopmarks/${sopMarksId}`, {
          id: sopMarksId,
          employee_id: employee_id,

          sop_id: sopId,

          marks: marks,
        });
        alert("Marks updated successfully!");
        setSopId("");
        setMarks(0);
      } catch (error) {
        console.error("Error adding marks:", error);
      }
    }
  };
  const sopPdf = {
    S001: "1BnoSDbyOi_yWWus1s_l6CpIVZFWgeS8P",
    S002: "1s345Q6-8l58jqvF_X_nsQIx_HobrqgN7",
    S003: "1hurVUKlYfo73Zq7MpQiU4JFS4K74N4ow",
  };
  return (
    <div>
      {showSops &&(
        <>
      <h2>SOPs for Employee ID: {employee_id}</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>SOP ID</th>
            <th>SOP Title</th>
            <th>SOP Departments</th>
            <th>Action</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {sops.map((sop) => (
            <tr key={sop.sop_id}>
              <td>
                    <button onClick={() => handleSopClick(sop.sop_id)}>
                      {sop.sop_id}
                    </button>
                  </td>
                  <td>
                    <Link
                      to={`https://drive.google.com/file/d/${
                        sopPdf[sop.sop_id]
                      }/view?usp=drive_link`}
                    >
                      {sop.sop_title}
                    </Link>
                  </td>
              <td>
                {sop.departments.map((department) => (
                  <li key={department.department_id}>{department.dept_name}</li>
                ))}
              </td>
              <td>
                {filteredResults.find((sopid) => sopid.sop_id === sop.sop_id)
                  ?.marks ? (
                  <button
                    onClick={() => {
                      setSopMarksId(
                        filteredResults.find(
                          (sopid) => sopid.sop_id === sop.sop_id
                        )?.id
                      );
                      setSopId(sop.sop_id);
                    }}
                  >
                    Update Marks
                  </button>
                ) : (
                  <button onClick={() => setSopId(sop.sop_id)}>
                    Add Marks
                  </button>
                )}
              </td>
              <td>
                {
                  filteredResults.find((sopid) => sopid.sop_id === sop.sop_id)
                    ?.marks
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {sopId && (
        <div>
          <form onSubmit={() => handleSubmit()}>
            <div>
              <label>Employee ID:</label>
              <input
                type="text"
                name="employee_id"
                value={employee_id}
                disabled
              />
            </div>
            <div>
              <label>SOP ID:</label>
              <input type="text" name="sop_id" value={sopId} disabled />
            </div>
            <div>
              <label>Marks:</label>
              <input
                type="number"
                name="marks"
                value={marks}
                onChange={(e) => setMarks(Number(e.target.value))}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      </>
      )}
       {!showSops && <SopEmployees sop_id={selectedSop} />}
    </div>
  );
};
export default EmployeeSOPs;
