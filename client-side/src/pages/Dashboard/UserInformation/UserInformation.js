import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Deposit from "./Deposit";
import FoundTransfer from "./FoundTransfer";
import Withdraw from "./Withdraw";

const UserInformation = () => {
  //  const [userInfo, setUserInfo] = useState({});
  const [isOpen, setIsopen] = useState(false);
  const [information, setInformation] = useState(null);
  const { id } = useParams();

  const {
    isLoading,
    data: userInfo,
    refetch,
  } = useQuery([`aprovedUserInfo${id}`], () =>
    fetch(`http://localhost:4000/approvedUser/${id}`).then((res) => res.json())
  );
  // useEffect(() => {
  //   const url = `http://localhost:4000/approvedUser/${id}`;
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => setUserInfo(data));
  // }, [id]);

  if (isLoading) {
    return;
  }
  return (
    <>
      <div className="hero main-h-screen bg-white text-black">
        <div>
          <div className="hero-content b flex-col lg:flex-row">
            <img src={userInfo.img} className="lg:w-96 sm:w-72" alt="" />

            <div>
              <table className="table">
                <tbody>
                  <tr>
                    <td className="bg-white">Account Number</td>
                    <td className="bg-white">{userInfo.accountNumber}</td>
                  </tr>
                  <tr>
                    <td className="bg-white">Name</td>
                    <td className="bg-white">{userInfo.displayName}</td>
                  </tr>
                  <tr>
                    <td className="bg-white">Father's Name</td>
                    <td className="bg-white">{userInfo.fatherName}</td>
                  </tr>
                  <tr>
                    <td className="bg-white">Mother's Name</td>
                    <td className="bg-white">{userInfo.motherName}</td>
                  </tr>

                  <tr>
                    <td className="bg-white">Email</td>
                    <td className="bg-white">{userInfo.email}</td>
                  </tr>

                  <tr>
                    <td className="bg-white">Phone</td>
                    <td className="bg-white">{userInfo.contact}</td>
                  </tr>
                  <tr>
                    <td className="bg-white">Address</td>
                    <td className="bg-white">{userInfo.address}</td>
                  </tr>
                  <tr>
                    <td className="bg-white">Gender</td>
                    <td className="bg-white">{userInfo.gender}</td>
                  </tr>
                  <tr>
                    <td className="bg-white">Account Type</td>
                    <td className="bg-white">{userInfo.accountType}</td>
                  </tr>
                  <tr>
                    <td className="bg-white">Deposit Amount</td>
                    <td className="bg-white">{userInfo.amount}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 my-10 mx-7 lg:grid-cols-4">
            <label
              htmlFor="withdraw"
              onClick={() => setInformation(userInfo)}
              className="btn btn-outline btn-secondary sm:btn-sm md:btn-md lg:btn-md"
            >
              Withdraw
            </label>

            <label
              htmlFor="found-transfer"
              onClick={() => setInformation(userInfo)}
              className="btn btn-outline btn-primary sm:btn-sm md:btn-md lg:btn-md"
            >
              Fund Transfer
            </label>
            <label
              htmlFor="deposit"
              onClick={() => setInformation(userInfo)}
              className="btn btn-outline btn-accent sm:btn-sm md:btn-md lg:btn-md"
            >
              Deposit
            </label>
          </div>
        </div>
      </div>
      {information && (
        <Withdraw
          refetch={refetch}
          information={information}
          userInfo={userInfo}
          // setUserInfo={setUserInfo}
          setInformation={setInformation}
        />
      )}
      {information && (
        <FoundTransfer
          information={information}
          userInfo={userInfo}
          refetch={refetch}
          // setUserInfo={setUserInfo}
          setInformation={setInformation}
        />
      )}
      {information && (
        <Deposit
          information={information}
          userInfo={userInfo}
          refetch={refetch}
          // setUserInfo={setUserInfo}
          setInformation={setInformation}
        />
      )}
    </>
  );
};

export default UserInformation;
