import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  lectureData: [],
};

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default lectureSlice.reducer;
