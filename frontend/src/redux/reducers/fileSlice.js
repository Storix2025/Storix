import { createSlice } from "@reduxjs/toolkit";

const fileSlice = createSlice({
  name: "files",
  initialState: {
    videoFile: null,
    videoURL: null,
    jsonFile: null,
  },
  reducers: {
    setVideoFile(state, action) {
      state.videoFile = action.payload.file;
      state.videoURL = action.payload.url;
    },
    setJsonFile(state, action) {
      state.jsonFile = action.payload;
    },
    clearFiles(state) {
      state.videoFile = null;
      state.videoURL = null;
      state.jsonFile = null;
    },
  },
});

export const { setVideoFile, setJsonFile, clearFiles } = fileSlice.actions;
export default fileSlice.reducer;
