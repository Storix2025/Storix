import { configureStore } from "@reduxjs/toolkit";
import storixReducer from "./reducers/appSlice";
import fileReducer from "./reducers/fileSlice";

export default configureStore({
  reducer: {
    app:  storixReducer,
    files: fileReducer,
  },
});
