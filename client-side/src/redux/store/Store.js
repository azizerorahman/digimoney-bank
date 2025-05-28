import { configureStore } from "@reduxjs/toolkit";
import ReviewReducer from "../reducers/ReviewReducer";
import TransactionReducer from "../reducers/TransactionReducer";
import ApprovedUserSlice from "../reducers/ApprovedUsersReducers";
import BlogSlice from "../reducers/BlogSlice";
import BankInfo from "../reducers/BankInfoSlice";

export default configureStore({
  reducer: {
    reviews: ReviewReducer,
    transaction: TransactionReducer,
    checkUser: ApprovedUserSlice,
    blogs: BlogSlice,
    bankinfo: BankInfo,
  },
});
