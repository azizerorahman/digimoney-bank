import React, { useState } from "react";
import TransactionRow from "./TransactionRow";
import useUserInfo from "../../hooks/useUserInfo";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import useFindTransaction from "../../hooks/useFindTransection";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTransaction } from "../../redux/reducers/TransactionReducer";

const Transaction = () => {
  const [user] = useAuthState(auth);
  const { userInfo } = useUserInfo(user);
  const [page, setPage] = useState(1);
  const { transaction } = useSelector((state) => state.transaction);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchTransaction({ accountNumber: userInfo?.accountNumber, page: page })
    );
  }, [dispatch, page, userInfo?.accountNumber]);

  const { pageCount } = useFindTransaction(userInfo);

  return (
    <div className="mx-4 lg:mx-0">
      <h1 className="text-3xl font-bold text-base-300">Total Transection</h1>
      <section className="mt-12 shadow-2xl rounded-2xl">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <tbody>
              {transaction?.map((rowdata, i) => (
                <TransactionRow key={i} userInfo={userInfo} rowdata={rowdata} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <div className="text-center my-8">
        {[...Array(pageCount).keys()].map((number) => (
          <button
            key={number}
            className={
              page === number + 1
                ? "bg-[#6160DC] text-white  w-8 h-8 mr-2"
                : "border-[#6160DC] border-2 w-8 h-8 mr-2"
            }
            onClick={() => setPage(number + 1)}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Transaction;
