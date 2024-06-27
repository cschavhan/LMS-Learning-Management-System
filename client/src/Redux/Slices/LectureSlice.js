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

// add course lectures
export const addCourseLectures = createAsyncThunk(
  "course/lecture/add",
  async (data) => {
    try {
      let formData = new FormData();
      formData.append("title", data?.title);
      formData.append("description", data?.description);
      formData.append("lectureThumbnail", data?.lectureThumbnail);

      const response = axiosInstance.post(`/course/${data._id}`, formData);
      toast.promise(response, {
        loading: "Wait, lectures adding is in process",
        success: (response) => {
          return response?.data?.message;
        },
        error: "Failed to add lectures",
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
