import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Withdraw = ({ userInfo, refetch, setInformation }) => {
  const { amount, accountNumber } = userInfo;
  const [error, setError] = useState("");

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);

    const withdrawAmount = parseFloat(data.withdrawAmount);
    if (withdrawAmount <= 0) {
      setError("Please provide a posetive number or bigger then zero");
      return;
    }
    if (userInfo.amount > withdrawAmount) {
      const newAmount = userInfo.amount - withdrawAmount;
      const updatedAmount = { amount: newAmount, withdrawAmount };
      const url = `${process.env.REACT_APP_API_URL}/approvedUsers/${accountNumber}`;
      fetch(url, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedAmount),
      })
        .then((res) => res.json())
        .then((result) => {
          refetch();
          reset();
          setInformation(null);
        });
    } else {
      setError("Withdraw balance should be smaller than amount");
    }
  };
  return (
    <div>
      <input type="checkbox" id="withdraw" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box text-base-300">
          <label
            htmlFor="withdraw"
            className="absolute btn btn-sm btn-circle right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="px-12">
              <h3 className="font-bold text-2xl">Withdraw!</h3>

              <div className="w-full max-w-full my-4 form-control">
                <label htmlFor="accountNumber">ACCOUNT NUMBER</label>
                <input
                  id="account-number"
                  name="accountNumber"
                  className="px-5"
                  value={accountNumber}
                  type="number"
                  disabled
                />
              </div>

              <div className="w-full max-w-full my-4 form-control">
                <label htmlFor="accountNumber">CURRENT BALANCE</label>
                <input
                  id="account-number"
                  name="accountNumber"
                  className="px-5"
                  value={amount}
                  type="number"
                  disabled
                />
              </div>

              <div className="w-full max-w-full my-4 form-control">
                <label htmlFor="accountNumber">AMOUNT TO WITHDRAW</label>
                <input
                  type="number"
                  className="px-5"
                  name=""
                  id=""
                  {...register("withdrawAmount")}
                  placeholder="Enter Your Amount"
                />
              </div>
              <div className="text-center">
                <button className="btn btn-secondary">Withdraw now</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
