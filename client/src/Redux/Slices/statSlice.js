import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  allUsersCount: 0,
  subscribedCount: 0,
};

// get user and user subscribed count
export const getUserStats = createAsyncThunk("stats/get", async () => {
  try {
    const response = axiosInstance.get("/admin/stats/user");
    toast.promise(response, {
      loading: "Getting the stats...!",
      success: (res) => {
        return res?.data?.message;
      },
      error: "Failed to fetch stats",
    });

    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const statSlice = createSlice({
  name: "stat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserStats.fulfilled, (state, action) => {
      console.log(action.payload);
      if (action.payload) {
        state.allUsersCount = action?.payload?.allUsersCount;
        state.subscribedCount = action?.payload?.subscribedCount;
      }
    });
  },
});

export default statSlice.reducer;
