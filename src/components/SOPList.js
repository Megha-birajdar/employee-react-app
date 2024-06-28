import React, { useState, useEffect } from "react";
import axios from "axios";
import SopEmployees from "./SOPEmployees";
import { Link, useNavigate } from "react-router-dom";
import DeleteSop from "./DeleteSop";
import { setSopId, setSopTitle, setSopDepartmentId, setSopPdfUrl } from "../Utils/employeeConfig";
import { useDispatch, useSelector } from "react-redux";
import FileLink from "./FileLink";

const SOPList = () => {
  const [sops, setSops] = useState([]);
  const [showSops, setShowSops] = useState(true);
  const [selectedSop, setSelectedSop] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/sops`)
      .then((response) => setSops(response.data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const handleUpdateSop = (sop_id, sop_title, department_id, file_path) => {
    dispatch(setSopId(sop_id));
    dispatch(setSopTitle(sop_title));
    dispatch(setSopDepartmentId(department_id));
    dispatch(setSopPdfUrl(file_path));
    navigate("updateSop");
  };

  const handleSopClick = async (sop_id) => {
    setShowSops(false);
    setSelectedSop(sop_id);
  };

  const filteredSops = sops.filter(sop =>
    sop.sop_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {showSops && (
        <>
          <h1 className="text-blue-600">List Of All SOPs</h1>
          <input
            type="text"
            placeholder="Search by sop_id"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-2 border-black text-red-500 font-bold px-2 m-2"
          />
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
              {filteredSops.map((sop, index) => (
                <tr key={sop.sop_id}>
                  <td>{index + 1}</td>
                  <td>
                    <button
                      className="border-2 border-black rounded-lg px-2 m-1"
                      onClick={() => handleSopClick(sop.sop_id)}
                    >
                      {sop.sop_id}
                    </button>
                  </td>
                  <td>
                    <FileLink filePath={sop.file_path} sopTitle={sop.sop_title} />
                  </td>
                  <td>{sop.department.dept_name}</td>
                  <td>
                    <button
                      className="border-2 rounded-md border-black px-2 m-1"
                      onClick={() =>
                        handleUpdateSop(sop.sop_id, sop.sop_title, sop.department.department_id, sop.file_path)
                      }
                    >
                      Update
                    </button>
                    <DeleteSop sop_id={sop.sop_id} />
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
