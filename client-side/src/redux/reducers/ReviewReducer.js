import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  review: [],
  errors: "",
};

export const fetchUsers = createAsyncThunk("review/fetchUsers", () => {
  return axios.get("http://localhost:4000/review").then((res) => res.data);
});

const userReviewSlice = createSlice({
  name: "review",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.review = action.payload;
      state.errors = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.review = [];
      state.errors = action.error.message;
    });
  },
});

export default userReviewSlice.reducer;
