import { createSlice } from "@reduxjs/toolkit";

const employeeConflig = createSlice({
  name: "UpdateEmployeeId",
  initialState: {
    updateEmployeeId: "",
    selectedEmployeeId: "",
    selectedDepartmentId: "",
  },
  reducers: {
    setEmployeeId: (state, action) => {
      state.updateEmployeeId = action.payload;
    },
    setSelectedEmployeeId: (state, action) => {
      state.selectedEmployeeId = action.payload;
    },
    setSelectedDepartmentId: (state, action) => {
      state.selectedDepartmentId = action.payload;
    },

  },
});

export const { setEmployeeId, setSelectedEmployeeId, setSelectedDepartmentId } = employeeConflig.actions;
export default employeeConflig.reducer;