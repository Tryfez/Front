import {configureStore} from "@reduxjs/toolkit";
import tasksSlice from "./tasks.slice.js";
import authSlice from "./auth.slice.js";

const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    auth: authSlice
  }
})

export default store