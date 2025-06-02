import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaArrowRight } from "react-icons/fa";
import { refresh } from "aos";

const FoundTransfer = ({ userInfo, refetch, setInformation }) => {
  const { amount, accountNumber, email } = userInfo;

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

    const receiverAccountNumber = e.target.accountNumber.value;

    setError({});

    const transferData = {
      accountNumber: receiverAccountNumber,
      amount,
    };

    const url = `${process.env.REACT_APP_API_URL}/transfer?email=${email}`;

    fetch(url, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(transferData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message) {
          toast.error(data.message);
          setError({ notMatchError: "Account number did not match" });
          return;
        }
        if (
          data?.finalResult?.modifiedCount > 0 &&
          data?.insertTransection?.modifiedCount > 0 &&
          data?.insertTransectionDataToReceiver?.modifiedCount > 0
        ) {
          e.target.reset();

          refetch();
          setInformation(null);
          toast.success("Transfer Balance Successfully", {
            position: "top-center",
          });
        }
      });
  };
  return (
    <>
      <input type="checkbox" id="found-transfer" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box text-base-300">
          <label
            htmlFor="found-transfer"
            className="absolute btn btn-sm btn-circle right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-2xl px-12">Found Transfer!</h3>
          <form onSubmit={handleSubmit}>
            <div className="flex w-full my-5">
              <div className="grid h-20 flex-grow ">
                <label htmlFor="accountNumber">ACCOUNT NUMBER</label>
                <input
                  id="account-number"
                  value={accountNumber}
                  type="number"
                  disabled
                />
                <label htmlFor="accountNumber">CURRENT BALANCE</label>
                <input
                  id="account-number"
                  className="px-2"
                  value={amount}
                  type="number"
                  disabled
                />
                <label htmlFor="accountNumber">Enter BALANCE</label>
                <input id="account-number" name="amount" type="number" />
              </div>
              <div className="divider divider-horizontal">
                <FaArrowRight className="font-bold text-7xl" />
              </div>
              <div className="grid h-20 flex-grow ">
                <label htmlFor="accountNumber">Reveiver ACCOUNT NUMBER</label>
                <input id="account-number" name="accountNumber" type="number" />
                <label htmlFor="accountNumber">CURRENT BALANCE</label>
                <input
                  id="account-number"
                  className="px-2"
                  value={amount}
                  type="number"
                  disabled
                />
              </div>
            </div>
            <div className="text-center mt-20">
              <button for="found-transfer" className="btn btn-primary">
                Found Transfer now
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FoundTransfer;
