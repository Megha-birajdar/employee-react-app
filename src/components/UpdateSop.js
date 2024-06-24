import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setSopTitle } from "../Utils/employeeConfig";


const UpdateSop = ({ }) => {

    const sop_id = useSelector((store) => store.employeeId.SopId);
    const sop_title = useSelector((store) => store.employeeId.SopTitle);
    const dept_id = useSelector((store) => store.employeeId.SopDepartmentId);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        console.log(e.target.value);
        dispatch(setSopTitle(e.target.value));
    };

    const handleSubmit = async (e) => {
        //e.preventDefault();
        try {
            await axios.put(
                `http://localhost:8080/api/sops/${sop_id}`,
                {
                    sop_id: sop_id,
                    sop_title: sop_title,
                    department: {
                        department_id: dept_id
                    }
                }
            );
            alert("Sop updated successfully!");

        } catch (error) {
            console.error("Error updating sop:", error);
        }
    };
    return (
        <div>
            <h2>Update Sop</h2>
            <form onSubmit={() => handleSubmit()}>
                <div>
                    <label className="font-bold">SOP ID:</label>
                    <input className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 text-gray-900 ring-1 ring-inset  ring-black placeholder:text-gray-400"
                        type="text"
                        name="sop_id"
                        value={sop_id}
                        disabled
                    />
                </div>
                <div>
                    <label className="font-bold">SOP Title:</label>
                    <input className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 text-gray-900 ring-1 ring-inset  ring-black placeholder:text-gray-400"
                        type="text"
                        name="sop_title"
                        value={sop_title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="font-bold">SOP Department:</label>
                    <input className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 text-gray-900 ring-1 ring-inset  ring-black placeholder:text-gray-400"
                        type="text"
                        name="dept_name"
                        value={dept_id}
                        disabled
                    />
                </div>
                <button className="w-auto rounded-md border-0 pl-2 pr-2 ml-4 pt-1 pb-1 my-1 font-bold text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400"
                    type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default UpdateSop;
