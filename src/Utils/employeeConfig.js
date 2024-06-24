import { createSlice } from "@reduxjs/toolkit";

const employeeConflig = createSlice({
  name: "UpdateEmployeeId",
  initialState: {
    updateEmployeeId: "",
    selectedEmployeeId: "",
    selectedDepartmentId: "",
    SopId: "",
    SopTitle: "",
    SopDepartmentId: ""
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
    setSopId: (state, action) => {
      state.SopId = action.payload;
    },
    setSopTitle: (state, action) => {
      state.SopTitle = action.payload;
    },
    setSopDepartmentId: (state, action) => {
      state.SopDepartmentId = action.payload;
    },
},
});

export const { setEmployeeId, setSelectedEmployeeId, setSelectedDepartmentId, setSopId, setSopTitle, setSopDepartmentId } = employeeConflig.actions;
export default employeeConflig.reducer;