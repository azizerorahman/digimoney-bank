import React from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import auth from "../../firebase.init";
import useUserInfo from "../../hooks/useUserInfo";
import BalanceCard from "./BalanceCard";
import { toast } from "react-toastify";

const Balance = () => {
  const [user] = useAuthState(auth);
  const [error, setError] = useState("");
  const { userInfo, refetch, isLoading } = useUserInfo(user);

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const withdrawAmount = parseFloat(data.withdrawAmount);
    if (withdrawAmount <= 0) {
      setError("Please provide a posetive number or bigger then zero");
      return;
    }
    if (userInfo.amount > withdrawAmount) {
      const newAmount = userInfo.amount - withdrawAmount;
      const updatedAmount = { amount: newAmount, withdrawAmount };
      const url = `http://localhost:4000/approvedUsers/${userInfo.accountNumber}`;
      fetch(url, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedAmount),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result) {
            toast.success("withdraw money successfully");
            refetch();
            reset();
          }
        });
    } else {
      toast.error("Insufficient Balance");
    }
  };

  if (isLoading) {
    return;
  }

  return (
    <div>
      {/* balance card  */}
      <BalanceCard></BalanceCard>
      {/* withdraw card */}
      <div className="card card-side bg-white shadow-xl mt-10">
        <div className="card-body bg-white ">
          <h2 className="card-title">Withdraw</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="label">
              <span className="label-text">Amount to withdraw</span>
            </label>
            <input
              type="number"
              placeholder="Provide Amount"
              className="input input-bordered w-full max-w-xs"
              {...register("withdrawAmount")}
            />

            <input
              className="btn btn-primary mt-2 lg:mt-0 lg:ml-4"
              type="submit"
            />
            <div className="">
              <label className="text-xs font-bold mx-auto block text-red-600">
                {error}
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Balance;
