import React, { useState, useEffect } from "react";
import axios from "axios";
import SopEmployees from "./SOPEmployees";

const EmployeeSOPs = () => {
  const [sops, setSOPs] = useState([]);
  const [sopId, setSopId] = useState("");
  const [marks, setMarks] = useState(0);
  const [sopMarks, setSopMarks] = useState([]);
  const [sopMarksId, setSopMarksId] = useState();
  const [showSops, setShowSops] = useState(true);
  const [selectedSop, setSelectedSop] = useState(null);
  const employee_id = JSON.parse(localStorage.getItem('employeeId'));
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/empsopmarks`)
      .then((response) => setSopMarks(response.data))
      .catch((error) => console.error("Error fetching marks:", error));
  }, []);
  console.log("sopMarks", sopMarks);
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
    filteredResults.find((sopid) => sopid.sop_id === "SPPL-SOP-AP-001")
  );

  const handleSubmit = async (e) => {
    //e.preventDefault();
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
  return (
    <div>
      {showSops && (
        <>
          <h2>SOPs for Employee ID: {employee_id}</h2>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>S_NO.</th>
                <th>SOP ID</th>
                <th>SOP Title</th>
                <th>SOP Department</th>
                <th>Action</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              {sops.map((sop, index) => (
                <tr key={sop.sop_id}>
                  <td>{index + 1}</td>
                  <td>
                    {sop.sop_id}
                  </td>
                  <td>{sop.sop_title}</td>
                  <td>{sop.department.dept_name}</td>
                  <td>
                    {filteredResults.find(
                      (sopid) => sopid.sop_id === sop.sop_id
                    )?.marks ? (
                      <button className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 font-bold text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400"
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
                      <button className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 font-bold text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400" onClick={() => setSopId(sop.sop_id)}>
                        Add Marks
                      </button>
                    )}
                  </td>
                  <td>
                    {
                      filteredResults.find(
                        (sopid) => sopid.sop_id === sop.sop_id
                      )?.marks
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
                  <label className="font-bold">Employee ID:</label>
                  <input className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 font-bold text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400"
                    type="text"
                    name="employee_id"
                    value={employee_id}
                    disabled
                  />
                </div>
                <div>
                  <label className="font-bold">SOP ID:</label>
                  <input className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 font-bold text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400"
                    type="text"
                    name="sop_id"
                    value={sopId}
                    disabled />
                </div>
                <div>
                  <label className="font-bold">Marks:</label>
                  <input className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 font-bold text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400"
                    type="number"
                    name="marks"
                    value={marks}
                    onChange={(e) => setMarks(Number(e.target.value))}
                  />
                </div>
                <button className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 font-bold text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400" type="submit">Submit</button>
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
