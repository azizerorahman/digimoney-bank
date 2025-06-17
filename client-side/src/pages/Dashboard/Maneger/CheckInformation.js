import React, { useRef } from "react";
import { toast } from "react-toastify";

const CheckInformation = ({ information, users, setUsers }) => {
  const accountRef = useRef();
  const {
    _id,
    displayName,
    fatherName,
    motherName,
    email,
    contact,
    address,
    img,
    gender,
    amount,
    accountType,
    capturedPhoto,
  } = information;

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const url = `${process.env.REACT_APP_API_URL}/accountNumber/${_id}`;
    fetch(url, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };

  const approved = (id, { information }, e) => {
    information["accountNumber"] = accountRef.current.value;

    fetch("${process.env.REACT_APP_API_URL}/approvedUsers", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(information),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          const url = `${process.env.REACT_APP_API_URL}/users/${id}`;

          fetch(url, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.deletedCount > 0) {
                toast.success("User request approved successfully");
                const remaining = users.filter((user) => user._id !== id);
                setUsers(remaining);
              }
            });
        }
      });
  };

  return (
    <>
      <input type="checkbox" id="check-information" className="modal-toggle" />
      <div className="modal modal-bottom  sm:modal-middle">
        <div className="modal-box bg-base-100 text-base-300">
          <label
            htmlFor="check-information"
            className="absolute btn btn-sm btn-circle right-2 top-2"
          >
            ✕
          </label>

          <div className="mt-10  overflow-x-auto">
            <div className="flex items-center justify-center gap-4 mx-auto avatar">
              <div className="w-65">
                <img src={img} alt="" />
              </div>
              <div className="w-full">
                <img src={capturedPhoto} alt="" />
              </div>
            </div>
            <table className="table w-full my-10">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{displayName}</td>
                </tr>
                <tr>
                  <td>Father's Name</td>
                  <td>{fatherName}</td>
                </tr>
                <tr>
                  <td>Mother's Name</td>
                  <td>{motherName}</td>
                </tr>

                <tr className="">
                  <td>Email</td>
                  <td>{email}</td>
                </tr>

                <tr>
                  <td>Phone</td>
                  <td>{contact}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>{address}</td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>{gender}</td>
                </tr>
                <tr>
                  <td>Account Type</td>
                  <td>{accountType}</td>
                </tr>
                <tr>
                  <td>Deposit Amount</td>
                  <td>{amount}</td>
                </tr>
                <tr>
                  <td>Account Number</td>
                  <td>
                    {/* <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="number"
                    placeholder="   Account Number"
                    
                    {...register("accountNumber", {
                      required: {
                        value: true,
                        message: "*Enter Account Number",
                      },
                    })}
                  />
                  <label className="pt-0 label">
                    {errors.name?.type === "required" && (
                      <span className="label-text-alt text-error">
                        {errors.accountNumber.message}
                      </span>
                    )}
                  </label>
                  <input className="ml-4 btn btn-primary btn-xs"  type="submit" />
                  </form> */}
                    <input
                      ref={accountRef}
                      type="text"
                      className="input input-primary"
                      placeholder="Account-number"
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="modal-action">
            <label
              onClick={() => approved(_id, { information })}
              for="check-information"
              className="btn btn-active btn-accent"
            >
              Approved
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckInformation;
