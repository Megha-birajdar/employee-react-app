import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeSOPs = ({ employee_id }) => {
  const [sops, setSOPs] = useState([]);
  const [sopId, setSopId] = useState("");
  const [marks, setMarks] = useState(0);
  const [sopMarks, setSopMarks] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/empsopmarks`)
      .then((response) => setSopMarks(response.data))
      .catch((error) => console.error("Error fetching marks:", error));
  }, []);
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
  console.log("sopMarks", filteredResults);

  const handleSubmit = async (e) => {
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
  };
  return (
    <div>
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
              <td>{sop.sop_id}</td>
              <td>{sop.sop_title}</td>
              <td>
                {sop.departments.map((department) => (
                  <li key={department.department_id}>{department.dept_name}</li>
                ))}
              </td>
              <td>
                {filteredResults.find((sopid) => sopid.sop_id === sop.sop_id)
                  ?.marks ? (
                  <button onClick={() => setSopId(sop.sop_id)}>
                    Update Marks
                  </button>
                ) : (
                  <button onClick={() => setSopId(sop.sop_id)}>
                    Add Marks
                  </button>
                )}
                {/* <button onClick={() => setSopId(sop.sop_id)}>Add Marks</button>
                <button onClick={() => setSopId(sop.sop_id)}>
                  Update Marks
                </button> */}
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
    </div>
  );
};
export default EmployeeSOPs;
