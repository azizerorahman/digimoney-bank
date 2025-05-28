import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  verified: {},
  errors: "",
};
export const fetchApprovedUser = createAsyncThunk(
  "approvedUser/fetchUsers",
  async ({ email = '' } = {}) => {
    if (!email) {
      return {};  
    }
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/verified/${email}`);
    return response.data.verified;
  }
);

const approvedUserSlice = createSlice({
  name: "review",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchApprovedUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchApprovedUser.fulfilled, (state, action) => {
      state.loading = false;
      state.verified = action.payload;
      state.errors = "";
    });
    builder.addCase(fetchApprovedUser.rejected, (state, action) => {
      state.loading = false;
      state.verified = [];
      state.errors = action.error.message;
    });
  },
});

export default approvedUserSlice.reducer;
