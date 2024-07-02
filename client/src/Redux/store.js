import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/authSlice";
import courseSliceReducer from "./Slices/courseSlice";
import lectureSliceReducer from "./Slices/LectureSlice";
import razorpaySliceReducer from "./Slices/razorpaySlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course: courseSliceReducer,
    lecture: lectureSliceReducer,
    razorpay: razorpaySliceReducer,
  },
  devTools: true,
});

export default store;
