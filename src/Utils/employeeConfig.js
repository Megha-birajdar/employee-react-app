import { createSlice } from "@reduxjs/toolkit";

const employeeConflig = createSlice({
  name: "UpdateEmployeeId",
  initialState: {
    updateEmployeeId: "",
    selectedEmployeeId: "",
    selectedDepartmentId: "",
    SopId: "",
    SopTitle: "",
    SopDepartmentId: "",
    SopPdfUrl:""
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
    setSopPdfUrl: (state, action) => {
      state.SopPdfUrl = action.payload;
    }
},
});

export const { setEmployeeId, setSelectedEmployeeId, setSelectedDepartmentId, setSopId, setSopTitle, setSopDepartmentId, setSopPdfUrl } = employeeConflig.actions;
export default employeeConflig.reducer;