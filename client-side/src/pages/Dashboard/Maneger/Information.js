import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Information = ({ user, index, users, setUsers, setInformation }) => {
  const handleDelete = (id) => {
    confirmAlert({
      message: "Are you sure you want to delete?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            // send updated data to server
            const url = `http://localhost:4000/users/${id}`;
            fetch(url, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.deletedCount > 0) {
                  const remaining = users.filter((user) => user._id !== id);
                  setUsers(remaining);
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
    <tr className="bg-white">
      <th className="bg-white">{index + 1}</th>
      <td className="bg-white">
        <div className="avatar">
          <div className="w-16 rounded-full">
            <img src={user.img} alt="" />
          </div>
        </div>
      </td>

      <td className="bg-white">{user.displayName}</td>

      <td className="bg-white">{user.email}</td>
      <td className="bg-white">{user.contact}</td>
      <td className="bg-white">{user.address}</td>

      <td className="bg-white">
        <label
          htmlFor="check-information"
          onClick={() => setInformation(user)}
          className="mx-2 btn btn-xs btn-success"
        >
          Check
        </label>

        <button
          onClick={() => handleDelete(user._id)}
          className="btn btn-xs btn-error"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Information;
