import React, { useState, useEffect } from "react";
import axios from "axios";
import SopEmployees from "./SOPEmployees";
import { Link, useNavigate } from "react-router-dom";
import DeleteSop from "./DeleteSop";
import { setSopId, setSopTitle, setSopDepartmentId } from "../Utils/employeeConfig";
import { useDispatch, useSelector } from "react-redux";

const SOPList = () => {
  const [sops, setSops] = useState([]);
  const [showSops, setShowSops] = useState(true);
  const [selectedSop, setSelectedSop] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/sops`)
      .then((response) => setSops(response.data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);
  console.log(sops, "megha");
  const handleUpdateSop = (sop_id, sop_title, department_id) => {

    dispatch(setSopId(sop_id));
    dispatch(setSopTitle(sop_title));
    dispatch(setSopDepartmentId(department_id));
    navigate("updateSop");
  };
  const handleSopClick = async (sop_id) => {
    setShowSops(false);
    setSelectedSop(sop_id);
  };
  // const sopPdf = {
  //   S001: "1BnoSDbyOi_yWWus1s_l6CpIVZFWgeS8P",
  //   S002: "1s345Q6-8l58jqvF_X_nsQIx_HobrqgN7",
  //   S003: "1hurVUKlYfo73Zq7MpQiU4JFS4K74N4ow",
  // };

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
                <th>Actions</th>
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
                  {/* <td>
                    <Link
                    to={`https://drive.google.com/file/d/${sopPdf[sop.sop_id] }/view?usp=drive_link`}>{sop.sop_title}</Link>
                      </td> */}
                  <td>{sop.sop_title}</td>
                  <td>{sop.department.dept_name}</td>
                  <td>
                    <button className="border-2 rounded-md border-black px-2 m-1"
                      onClick={() => handleUpdateSop(sop.sop_id, sop.sop_title, sop.department.department_id)}
                    >
                      Update
                    </button>
                    <DeleteSop
                      sop_id={sop.sop_id}
                    />
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
