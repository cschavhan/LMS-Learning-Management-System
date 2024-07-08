import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data: JSON.parse(localStorage.getItem("data")) || {},
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

//update user profile
export const updateProfile = createAsyncThunk(
  "/auth/update/profile",
  async (data) => {
    try {
      const res = axiosInstance.put(`user/update`, data);
      toast.promise(res, {
        loading: "Wait! Update is in process",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to update profile",
      });

      return (await res).data;
    } catch (error) {
      toast.error(error?.responce?.data?.message);
    }
  }
);

//get user data
export const getUserData = createAsyncThunk("/auth/details", async () => {
  try {
    const res = axiosInstance.get("user/me");
    return (await res).data;
  } catch (error) {
    toast.error(error?.message);
  }
});

// change password
export const changePassword = createAsyncThunk(
  "auth/changepassword",
  async (data) => {
    try {
      const res = axiosInstance.post("/user/change-password", data);
      toast.promise(res, {
        loading: "Wait ! Password changing is in process..!",
        success: "Password changed successfully",
        error: "Failed to change password",
      });

      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// forgot Password
export const forgotPassword = createAsyncThunk(
  "auth/forgot-password",
  async (data) => {
    try {
      const res = axiosInstance.post("/user/reset", data);
      toast.promise(res, {
        loading: "Wait ! Verification link sending on your email.",
        success: "Verification link send successfully",
        error: "Failed send verification link",
      });

      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// reset password
export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async ({ resetToken, password }) => {
    try {
      const res = axiosInstance.post(`/user/reset/${resetToken}`, { password });
      toast.promise(res, {
        loading: "Wait ! Password reseting is in process.",
        success: "Password reset successfully",
        error: "Failed to reset password",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

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
      })
      .addCase(getUserData.fulfilled, (state, action) => {
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
      .addCase(changePassword.fulfilled, (state, action) => {
        localStorage.clear();
        state.isLoggedIn = false;
        state.data = {};
        state.role = "";
      });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
