import React, { useState } from "react";
import { useAuthState, useUpdatePassword } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useUserInfo from "../../hooks/useUserInfo";

const Profile = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [user] = useAuthState(auth);
  const { userInfo, isLoading, refetch } = useUserInfo(user);

  const [password, setPassword] = useState("");
  const [updatePassword, updating, error] = useUpdatePassword(auth);
  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  const onSubmit = async (data) => {
    // upload image
    const imageStorageKey = "6fe6eceade1c589e0923d835ad57b39d";
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          console.log(result.data.url);
          const profileImg = result.data.url;
          const url = `http://localhost:4000/profile/${user.email}`;
          fetch(url, {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ profileImg }),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
            });
          refetch();
        }
      });
  };

  return (
    <div className="mx-4 mb-16 text-base-300">
      <h1 className="text-[#2366B5] text-3xl font-bold mb-10 underline ">
        My Profile
      </h1>
      <div className="flex gap-x-10 flex-wrap justify-center lg:justify-start">
        <img
          className="lg:w-[25vh] w-[15vh] h-[15vh] lg:h-[25vh] lg:rounded-none rounded-full object-cover"
          src={userInfo?.profileImage}
          alt=""
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full max-w-xs form-control">
            <input
              type="file"
              placeholder=" &#xf0e0; Upload Your Profile picture"
              className="w-full mt-4 mb-6 lg:mb-1 lg:my-0 p-2 max-w-xs  text-base input input-icon"
              {...register("image", {
                required: {
                  value: true,
                  message: "profile picture is required",
                },
              })}
            />
          </div>
          <input
            className="btn btn-primary lg:w-[300px] bg-[#2366B5] border-none text-white font-bold  hover:bg-[#2366B5] block"
            type="submit"
            value="Upload"
          />
        </form>
      </div>
      <div className="mt-8">
        <h1 className="text-3xl  font-semibold">Account information</h1>
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-x-4 mt-8">
          <label className="w-[250px] text-xl">Name </label>
          <input
            className="input input-primary border-[#2366B5] rounded-none pr-32 focus:outline-none"
            type="text"
            value={user.displayName}
          />
        </div>
        {/* <div className='flex items-center gap-x-4 mt-8'>
                    <label className='w-[250px] text-xl'>Last Name </label>
                    <input className='input input-primary border-[#2366B5] rounded-none pr-32 focus:outline-none' type="text" value="Hasan" />
                </div> */}
        <div className="flex lg:items-center flex-col lg:flex-row lg:gap-x-4 mt-8">
          <label className="w-[250px] text-xl ">Email </label>
          <input
            className="input input-primary border-[#2366B5] pr-32 rounded-none focus:outline-none"
            type="email"
            value={user.email}
          />
        </div>
      </div>
      <div className="mt-8">
        <h1 className="uppercase text-3xl font-semibold">Change password</h1>

        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-x-4 mt-8">
          <label className="w-[250px] text-xl">New Password </label>
          <input
            className="input input-primary border-[#2366B5] rounded-none pr-32 focus:outline-none"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-x-4 mt-8">
          <label className="w-[250px] text-xl"> </label>

          <button
            onClick={async () => {
              await updatePassword(password);
              toast("Yor password has been updated");
            }}
            className="btn btn-primary lg:w-[300px] bg-[#2366B5] border-none text-white font-bold  hover:bg-[#2366B5] block "
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
