import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  lectures: [],
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

      const responsePromise = axiosInstance.post(
        `/course/${data.id}`,
        formData
      );

      toast.promise(responsePromise, {
        loading: "Wait, lectures adding is in process",
        success: (response) => {
          return response?.data?.message;
        },
        error: "Failed to add lectures",
      });
      const response = await responsePromise;
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// delete course lectures
export const deleteCourseLectures = createAsyncThunk(
  "course/lecture/delete",
  async ({ courseid, lectureid }) => {
    try {
      const response = axiosInstance.delete(`/course/${courseid}/${lectureid}`);
      toast.promise(response, {
        loading: "Wait, lectures deleting is in process",
        success: (response) => {
          return response?.data?.message;
        },
        error: "Failed to delete lectures",
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
  extraReducers: (builder) => {
    builder
      .addCase(getCourseLectures.fulfilled, (state, action) => {
        state.lectures = action?.payload?.lectures;
      })
      .addCase(addCourseLectures.fulfilled, (state, action) => {
        state.lectures = action.payload?.course?.lectures;
      });
  },
});

export default lectureSlice.reducer;
