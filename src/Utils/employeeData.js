import { createSlice } from "@reduxjs/toolkit";

const employeeData = createSlice({
  name: "UpdateEmployeeId",
  initialState: {
    EmployeeData: [],
  },
  reducers: {
    setEmployeeData: (state, action) => {
      state.EmployeeData = action.payload;
    },
  },
});

export const { setEmployeeData } = employeeData.actions;
export default employeeData.reducer;