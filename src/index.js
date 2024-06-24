import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import SOPList from "./components/SOPList";
import "./App.css";
import UpdateEmployee from "./components/UpdateEmployee";
import SaveEmployee from "./components/SaveEmployee";
import AddSOPs from "./components/AddSOPs";
import AddDepartment from "./components/AddDepartment";
import EmployeeSOPs from "./components/EmployeeSOPs";
import DepartmentSOPList from "./components/DepartmentSOPList";
import DepartmentList from "./components/DepartmentList";
import employeeStore from './Utils/employeeStore';
import { Provider } from "react-redux";
import UpdateSop from './components/UpdateSop';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([

  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "employee/employeeList",
        element: <EmployeeList />,

      },
      {
        path: "employee/employeeList/updateEmployee",
        element: <UpdateEmployee />,
      },
      {
        path: "employee/employeeList/sopList",
        element: <SOPList />,
      },
      {
        path: "employee/employeeList/addEmployee",
        element: <SaveEmployee />,
      },
      {
        path: "employee/employeeList/addSop",
        element: <AddSOPs />,
      },
      {
        path: "employee/employeeList/addDepartment",
        element: <AddDepartment />,
      },
      {
        path: "employee/employeeList/employeeSops",
        element: <EmployeeSOPs />,
      },
      {
        path: "employee/employeeList/departmentSops",
        element: <DepartmentSOPList />,
      },
      {
        path: "employee/employeeList/deptList",
        element: <DepartmentList />
      },
      {
        path: "employee/employeeList/sopList/updateSop",
        element: <UpdateSop />
      }
    ],
  }

]);
root.render(
  <React.StrictMode>
    <Provider store={employeeStore}>
      <div className="app-container">
        <h1 className="centered-header text-red-700">
          Employees Training Report With Status
        </h1>
        <RouterProvider router={router} />
      </div>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
