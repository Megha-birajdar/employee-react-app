import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import employeeStore from "./Utils/employeeStore";
import { Provider } from "react-redux";
import EmployeeList from "./components/EmployeeList";
import SOPList from "./components/SOPList";
import "./App.css";
import UpdateEmployee from "./components/UpdateEmployee";

const App = () => {
  const router = createBrowserRouter([
    // {
    //   path: "/",
    //   element: <SOPList />,
    // }
    {
      path: "/",
      element: <EmployeeList />,
    },
    {
      path: "/UpdateEmployee",
      element: <UpdateEmployee />,
    },
  ]);
  return (
    <Provider store={employeeStore}>
      <div className="app-container">
        <h1 className="centered-header">
          Employees Training Management System
        </h1>
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
};

export default App;
