import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data: localStorage.getItem("data") || {},
};

//get registration api
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = axiosInstance.post("user/register", data);
    toast.promise(res, {
      loading: "Wait! Creating your accounting",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create account",
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.responce?.data?.message);
  }
});

//get login api
export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res = axiosInstance.post("user/login", data);
    toast.promise(res, {
      loading: "Wait! Aunthentication is in process",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to login",
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.responce?.data?.message);
  }
});

//get the logout api
export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = axiosInstance.get("user/logout");
    toast.promise(res, {
      loading: "Wait! Logout is in process",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to logout",
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.responce?.data?.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const user = action?.payload?.user;
        if (user) {
          localStorage.setItem("data", JSON.stringify(user));
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("role", user.role || "");

          state.isLoggedIn = true;
          state.data = user;
          state.role = user.role || "";
        }
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.isLoggedIn = false;
        state.data = {};
        state.role = "";
      });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
