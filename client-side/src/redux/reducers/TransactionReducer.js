import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";
const initialState = {
  loading: false,
  transaction: [],
  errors: "",
};
export const fetchTransaction = createAsyncThunk(
  "transaction/fetchUsers",
  ({ accountNumber, page }, { dispatch, getState }) => {
    return axios
      .get(
        `http://localhost:4000/transaction/${accountNumber}?page=${page}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => res.data);
  }
);

export const isForbidden = (errors) => {
  const checked = errors.includes("403");
  if (checked) {
    return signOut(auth);
  }
};

const userTransactionSlice = createSlice({
  name: "review",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTransaction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTransaction.fulfilled, (state, action) => {
      state.loading = false;
      state.transaction = action.payload;
      state.errors = "";
    });
    builder.addCase(fetchTransaction.rejected, (state, action) => {
      state.loading = false;
      state.transaction = [];
      state.errors = action.error.message;
    });
  },
});

export default userTransactionSlice.reducer;
