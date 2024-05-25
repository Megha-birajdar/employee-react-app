import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import employeeStore from "./Utils/employeeStore";
import { Provider } from "react-redux";
import EmployeeList from "./components/EmployeeList";
import SOPList from "./components/SOPList";
import "./App.css";
import UpdateEmployee from "./components/UpdateEmployee";
import SaveEmployee from "./components/SaveEmployee";
import AddSOPs from "./components/AddSOPs";
import AddDepartment from "./components/AddDepartment";
import SignUp from "./SignUp";
import Login from "./Login";
import EmployeeSOPs from "./components/EmployeeSOPs";
import DepartmentSOPList from "./components/DepartmentSOPList";

const App = () => {
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
    <Provider store={employeeStore}>
      <div className="app-container">
        <h1 className="centered-header">
          Employees Training Report With Status-2024
        </h1>
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
};

export default App;
