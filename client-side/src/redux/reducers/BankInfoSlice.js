import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  bankinfo: [],
  errors: "",
};

export const fetchBankInfo = createAsyncThunk("bankinfo/fetchinfo", () => {
  return axios
    .get("${process.env.REACT_APP_API_URL}/bankinfo")
    .then((res) => res.data);
});

const BankInfoSlice = createSlice({
  name: "BankInfo",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchBankInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBankInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.bankinfo = action.payload;
      state.errors = "";
    });
    builder.addCase(fetchBankInfo.rejected, (state, action) => {
      state.loading = false;
      state.bankinfo = [];
      state.errors = action.error.message;
    });
  },
});

export default BankInfoSlice.reducer;
