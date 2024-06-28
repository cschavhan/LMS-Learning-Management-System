import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/authSlice";
import courseSliceReducer from "./Slices/courseSlice";
import lectureSliceReducer from "./Slices/LectureSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course: courseSliceReducer,
    lecture: lectureSliceReducer,
  },
  devTools: true,
});

export default store;
