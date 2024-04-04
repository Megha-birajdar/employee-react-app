// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const EmployeeSOPs = ({ employee_id }) => {
//   const [sops, setSOPs] = useState([]);
//   const [sopId, setSopId] = useState("");
//   const [marks, setMarks] = useState(0);

//   useEffect(() => {
//     const fetchSOPs = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/api/employees/${employee_id}/sops`
//         );
//         setSOPs(response.data);
//       } catch (error) {
//         console.error("Error fetching SOPs:", error);
//       }
//     };

//     fetchSOPs();
//   }, [employee_id]);

//   const handleSubmit = async (e) => {
//     console.log("megha", sopId);
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:8080/employee_sop_marks", {
//         employee_id: employee_id,
//         sop_id: sopId,
//         marks: marks,
//       });
//       setSopId("");
//       setMarks(0);
//     } catch (error) {
//       console.error("Error adding marks:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>SOPs for Employee ID: {employee_id}</h2>
//       <table className="table table-striped table-bordered">
//         <thead>
//           <tr>
//             <th>SOP ID</th>
//             <th>SOP Title</th>
//             <th>SOP Departments</th>
//             <th>Marks</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sops.map((sop) => (
//             <tr key={sop.sop_id}>
//               <td>{sop.sop_id}</td>
//               <td>{sop.sop_title}</td>
//               <td>
//                 {sop.departments.map((department) => (
//                   <li key={department.department_id}>{department.dept_name}</li>
//                 ))}
//               </td>
//               <td>
//                 <button onClick={() => setSopId(sop.sop_id)}>Add Marks</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {sopId && (
//         <div>
//           <form onSubmit={() => handleSubmit()}>
//             <div>
//               <label>Employee ID:</label>
//               <input
//                 type="text"
//                 name="employee_id"
//                 value={employee_id}
//                 disabled
//               />
//             </div>
//             <div>
//               <label>SOP ID:</label>
//               <input type="text" name="sop_id" value={sopId} disabled />
//             </div>
//             <div>
//               <label>Marks:</label>
//               <input
//                 type="number"
//                 name="marks"
//                 value={marks}
//                 onChange={(e) => setMarks(Number(e.target.value))}
//               />
//             </div>
//             <button type="submit">Submit</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };
// export default EmployeeSOPs;


import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeSOPs = ({ employee_id }) => {
  const [sops, setSOPs] = useState([]);
  const [sopId, setSopId] = useState("");
  const [marks, setMarks] = useState(0);

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

  const handleSubmit = async (e) => {
    //e.preventDefault();
    try {
      await axios.post("http://localhost:8080/employee_sop_marks", {
        employee_id: employee_id,
        sop_id: sopId,
        marks: marks,
      });
      alert("Marks added successfully!");
      setSopId("");
      setMarks(0);
      // After successful submission, you might want to refresh the SOPs list
      // You can either call the fetchSOPs function again or perform another API request to get updated data
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
            <th>Marks</th>
            <th>Action</th> {/* Add this new column for adding marks */}
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
              <td>{sop.marks}</td> {/* Display existing marks */}
              <td>
                <button onClick={() => setSopId(sop.sop_id)}>Add Marks</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {sopId && (
        <div>
          <form onSubmit={()=>handleSubmit()}>
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




