import { createSlice } from "@reduxjs/toolkit";

const employeeMarks = createSlice({
  name: "EmployeeMarks",
  initialState: {
    EmployeeMarks: [],
  },
  reducers: {
    setEmployeeMarks: (state, action) => {
      state.EmployeeMarks = action.payload;
    },
  },
});

export const { setEmployeeMarks } = employeeMarks.actions;
export default employeeMarks.reducer;