import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseData: [],
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default courseSlice.reducer;
