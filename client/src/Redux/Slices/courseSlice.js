import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  courseData: [],
};

//get all courses
export const getAllCourses = createAsyncThunk("/course/get", async () => {
  try {
    const responce = axiosInstance.get("/course");
    toast.promise(responce, {
      loading: "loading course data...",
      success: "Courses loaded successfully",
      error: "Failed to get courses",
    });
    return (await responce).data.courses;
  } catch (error) {
    toast.error(error?.responce?.data?.message);
  }
});

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action.payload) {
        state.courseData = [...action.payload];
      }
    });
  },
});

export default courseSlice.reducer;
