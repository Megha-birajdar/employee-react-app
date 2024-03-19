import { createSlice } from "@reduxjs/toolkit";

const employeeConflig = createSlice({
  name: "UpdateEmployeeId",
  initialState: {
    updateEmployeeId: "",
  },
  reducers: {
   setEmployeeId: (state, action) => {
      state.updateEmployeeId = action.payload;
    },
  },
});

export const { setEmployeeId } = employeeConflig.actions;
export default employeeConflig.reducer;