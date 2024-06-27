import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  lectureData: [],
};

// get all lecture
export const getCourseLectures = createAsyncThunk(
  "course/lecture/get",
  async (id) => {
    try {
      const response = axiosInstance.get(`/course/${id}`);
      toast.promise(response, {
        loading: "Wait, lectures fetching is in process",
        success: (response) => {
          return response?.data?.message;
        },
        error: "Failed to fetched lectures",
      });

      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default lectureSlice.reducer;
