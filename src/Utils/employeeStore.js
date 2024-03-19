import { configureStore } from "@reduxjs/toolkit";
import employeeConfig from "./employeeConfig";

const employeeStore = configureStore({
  reducer: {
    employeeId: employeeConfig,
  },
});
export default employeeStore;
