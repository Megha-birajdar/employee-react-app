import { configureStore } from "@reduxjs/toolkit";
import employeeConfig from "./employeeConfig";
import employeeData from "./employeeData";
import employeeMarks from "./employeeMarks";
import useReducer from "./userSlice";

const employeeStore = configureStore({
  reducer: {
    user: useReducer,
    employeeId: employeeConfig,
    employeeData: employeeData,
    employeeMarks: employeeMarks,
  },
});
export default employeeStore;
