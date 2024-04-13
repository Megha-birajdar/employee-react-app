import { configureStore } from "@reduxjs/toolkit";
import employeeConfig from "./employeeConfig";
import employeeData from "./employeeData";
import employeeMarks from "./employeeMarks";

const employeeStore = configureStore({
  reducer: {
    employeeId: employeeConfig,
    employeeData: employeeData,
    employeeMarks: employeeMarks,
  },
});
export default employeeStore;
