import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Deposit = ({ userInfo, setInformation, refetch }) => {
  const { amount, accountNumber } = userInfo;
  const [error, setError] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);

    const depositeAmount = parseFloat(data.depositeamount);
    if (depositeAmount <= 0) {
      setError("Please provide a posetive number or bigger then zero");
      return;
    }

    const newAmount = userInfo.amount + depositeAmount;

    const updatedAmount = { amount: newAmount, depositeAmount };
    const url = `${process.env.REACT_APP_API_URL}/deposite/${accountNumber}`;
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
          refetch();
          reset();
          setInformation(null);
        }
      });
  };

  return (
    <>
      <input type="checkbox" id="deposit" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box text-base-300">
          <label
            htmlFor="deposit"
            className="absolute btn btn-sm btn-circle right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-2xl px-12">Deposit!</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="px-12">
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
                <label htmlFor="accountNumber">AMOUNT TO DEPOSIT</label>
                <input
                  type="number"
                  className="px-5"
                  name=""
                  id=""
                  placeholder="Enter Your Amount"
                  {...register("depositeamount")}
                />
              </div>
            </div>
            <div className="text-center">
              <button className="btn btn-accent ">Deposit now</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Deposit;
