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
import MainContainer from "./components/MainContainer";

const App = () => {

  return (
    <Provider store={employeeStore}>
      <MainContainer />
    </Provider>
  );
};

export default App;
