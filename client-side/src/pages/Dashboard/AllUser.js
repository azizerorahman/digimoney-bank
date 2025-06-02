import React from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const AllUser = ({ user, users, index, refetch }) => {
  const { email, role, _id } = user;
  const makeAdmin = () => {
    fetch(`${process.env.REACT_APP_API_URL}/approvedUser/admin/${email}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          toast.success(`Successfully made an admin`, {
            position: "top-center",
          });
        }
      });
  };

  // delete user
  const handleDelete = (id) => {
    confirmAlert({
      message: "Are you sure you want to delete?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            // send updated data to server
            const url = `${process.env.REACT_APP_API_URL}/approvedUser/${id}`;
            fetch(url, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.deletedCount > 0) {
                  refetch();
                  toast.error("Removed user successfully");
                }
              });
          },
        },
        {
          label: "No",
          onClick: () => {
            return;
          },
        },
      ],
    });
  };

  return (
    <tr>
      <th className="bg-white">{index + 1}</th>
      <td className="bg-white">
        <div className="avatar">
          <div className="w-16 rounded-full">
            <img src={user.img} alt="" />
          </div>
        </div>
      </td>

      <td className="bg-white">{user.displayName}</td>
      <td className="bg-white">{user.accountNumber}</td>
      <td className="bg-white">{user.email}</td>
      <td className="bg-white">{user.contact}</td>
      <td className="bg-white">
        <Link
          to={`/dashboard/information/${_id}`}
          className="btn btn-outline btn-primary btn-xs "
        >
          View
        </Link>
      </td>
      <td className="bg-white">
        {role !== "admin" && (
          <button
            onClick={makeAdmin}
            className="btn btn-outline btn-accent btn-xs"
          >
            Make Admin
          </button>
        )}
        {role === "admin" && <span className="text-success">Admin</span>}
      </td>
      <td className="bg-white">
        <button
          onClick={() => handleDelete(user._id)}
          className="btn btn-outline btn-error btn-xs"
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

export default AllUser;
