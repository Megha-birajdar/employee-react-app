import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EmployeeList from "./EmployeeList";
import SOPList from "./SOPList";
import "../App.css";
import UpdateEmployee from "./UpdateEmployee";
import SaveEmployee from "./SaveEmployee";
import AddSOPs from "./AddSOPs";
import AddDepartment from "./AddDepartment";
import Login from "../Login";
import EmployeeSOPs from "./EmployeeSOPs";
import DepartmentSOPList from "./DepartmentSOPList";
import SignUp from "../SignUp";

const MainContainer = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <EmployeeList />,
        },
        {
            path: "/UpdateEmployee",
            element: <UpdateEmployee />,
        },
        {
            path: "/sopList",
            element: <SOPList />,
        },
        {
            path: "/addEmployee",
            element: <SaveEmployee />,
        },
        {
            path: "/addSop",
            element: <AddSOPs />,
        },
        {
            path: "/addDepartment",
            element: <AddDepartment />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/signup",
            element: <SignUp />,
        },
        {
            path: "/employeeSops",
            element: <EmployeeSOPs />,
        },
        {
            path: "/departmentSops",
            element: <DepartmentSOPList />,
        }

    ]);
    return (

        <div className="app-container">
            <h1 className="centered-header">
                Employees Training Report With Status-2024
            </h1>
            <RouterProvider router={router} />
        </div>

    );
};

export default MainContainer;
