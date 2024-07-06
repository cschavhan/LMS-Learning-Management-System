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

//get create new course api
export const createNewCourse = createAsyncThunk(
  "course/create",
  async (data) => {
    try {
      const responsePromise = axiosInstance.post("/course", data);
      toast.promise(responsePromise, {
        loading: "Creating new course",
        success: (response) => {
          return response?.data?.message;
        },
        error: "Failed to create course",
      });

      const response = await responsePromise;
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// delete course
export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
  try {
    const responce = axiosInstance.delete(`/course/${id}`);
    toast.promise(responce, {
      loading: "loading delet course ...",
      success: "Courses delete successfully",
      error: "Failed to delete course",
    });
    return (await responce).data;
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
