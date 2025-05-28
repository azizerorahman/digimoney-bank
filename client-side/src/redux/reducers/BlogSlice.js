import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  blogs: [],
  errors: "",
};

export const fetchBlog = createAsyncThunk("blog/fetchblog", () => {
  return axios.get("http://localhost:4000/blog").then((res) => res.data);
});

const blogSlice = createSlice({
  name: "blog",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchBlog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBlog.fulfilled, (state, action) => {
      state.loading = false;
      state.blogs = action.payload;
      state.errors = "";
    });
    builder.addCase(fetchBlog.rejected, (state, action) => {
      state.loading = false;
      state.blogs = [];
      state.errors = action.error.message;
    });
  },
});

export default blogSlice.reducer;
