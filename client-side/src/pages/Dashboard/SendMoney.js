import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { toast } from "react-toastify";

const SendMoney = () => {
  const [user] = useAuthState(auth);
  const [error, setError] = useState({
    lengthError: "",
    notMatchError: "",
  });
  const [notMatch, setNotMatch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setNotMatch("");
    const amount = e.target.amount.value;
    const confirmAmount = e.target.confirmAmount.value;
    const accountNumber = e.target.accountNumber.value;
    if (accountNumber.length < 12) {
      setError({ lengthError: "account number should be 12 cherachter" });
      return;
    }
    setError({});
    if (amount !== confirmAmount) {
      setNotMatch("Amount did not match");

      toast.error("Please, check amount again!");

      return;
    }
    const transferData = {
      accountNumber,
      amount,
    };

    const url = `http://localhost:4000/transfer?email=${user?.email}`;

    fetch(url, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(transferData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setError({ notMatchError: "Account number did not match" });
          return;
        }
        if (
          data?.finalResult?.modifiedCount > 0 &&
          data?.insertTransection?.modifiedCount > 0 &&
          data?.insertTransectionDataToReceiver?.modifiedCount > 0
        ) {
          e.target.reset();

          toast.success("Transfer Balance Successfully", {
            position: "top-center",
          });
        }
      });
  };
  return (
    <div className=" mx-6 lg:mx-0 text-base-300">
      <h1 className="text-[#2366B5] text-3xl font-bold mb-5 underline">
        Send Money
      </h1>
      <div className="flex justify-center items-center min-h-[60vh]">
        <form onSubmit={handleSubmit} className="w-full lg:w-auto">
          <div className="flex flex-col lg:flex-row lg:items-center  lg:gap-x-4 mt-8">
            <label className="w-[250px] text-xl">Account Number</label>
            <input
              name="accountNumber"
              required
              className="input input-primary border-[#2366B5] rounded-none pr-32 focus:outline-none"
              type="text"
              placeholder="***"
            />
          </div>
          <div className="text-end">
            <label className="text-xs font-bold mx-auto block text-red-600">
              {error?.notMatchError}
            </label>
            <label className="text-xs font-bold mx-auto block text-red-600">
              {error?.lengthError}
            </label>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center gap-x-4 mt-8">
            <label className="w-[250px] text-xl">Amount </label>
            <input
              name="amount"
              required
              className="input input-primary border-[#2366B5] rounded-none pr-32 focus:outline-none"
              type="text"
              placeholder="$"
            />
          </div>
          <div className="text-end">
            <label className="text-xs font-bold mx-auto block text-red-600">
              {notMatch}
            </label>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center gap-x-4 mt-8">
            <label className="w-[250px] text-xl">Confirm Amount </label>
            <input
              name="confirmAmount"
              required
              className="input input-primary border-[#2366B5] rounded-none pr-32 focus:outline-none"
              type="text"
              placeholder="$"
            />
          </div>
          <div className="text-end">
            <label className="text-xs font-bold mx-auto block text-red-600">
              {notMatch}
            </label>
          </div>
          <div className="flex lg:items-center lg:gap-x-4 mt-8">
            <label className="w-[250px] text-xl"> </label>

            <button className="btn btn-primary block w-full lg:w-[300px] bg-[#2366B5] border-none text-white font-bold  hover:bg-[#2366B5]  ">
              Send
            </button>
          </div>
          {/* {isTrue &&  <SendMoneyModal setIsture={setIsture} handleSubmit={handleSubmit} />} */}
        </form>
      </div>
    </div>
  );
};

export default SendMoney;
