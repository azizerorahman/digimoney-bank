import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Review = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data, event) => {
    event.preventDefault();

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
          const img = result.data.url;
          data["src"] = img;
          fetch("http://localhost:4000/review", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                toast.success("Review successfully...", {
                  position: "top-center",
                });
                reset();
              }
            });
        }
      });
  };
  return (
    <div className="text-base-300">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:w-8/12 mx-4 lg:mx-0 "
        action=""
      >
        <div className="mt-32 grid lg:grid-cols-2 gap-x-2">
          <div>
            <input
              className="input input-primary w-full p-8 focus:outline-none pl-10 border-[#2366B5]"
              type="text"
              placeholder="Your Name..."
              {...register("name", {
                required: {
                  value: true,
                  message: "*Field can't be empty",
                },
              })}
            />
            <label className="label pt-0">
              {errors.name?.type === "required" && (
                <span className="label-text-alt text-error">
                  {errors.name.message}
                </span>
              )}
            </label>
          </div>
          <div>
            <input
              className="input input-primary w-full p-8 focus:outline-none pl-10 border-[#2366B5]"
              type="text"
              placeholder="Your address..."
              {...register("address", {
                required: {
                  value: true,
                  message: "*Field can't be empty",
                },
              })}
            />
            <label className="label pt-0">
              {errors.address?.type === "required" && (
                <span className="label-text-alt text-error">
                  {errors.address.message}
                </span>
              )}
            </label>
          </div>
        </div>
        <div className="mt-5">
          <div>
            <input
              className="input input-primary w-full p-8 focus:outline-none pl-10 border-[#2366B5]"
              type="text"
              placeholder="Title..."
              {...register("title", {
                required: {
                  value: true,
                  message: "*Field can't be empty",
                },
              })}
            />
            <label className="label pt-0">
              {errors.title?.type === "required" && (
                <span className="label-text-alt text-error">
                  {errors.title.message}
                </span>
              )}
            </label>
          </div>
        </div>
        <div className="mt-5">
          <div>
            <textarea
              className="textarea textarea-primary pl-10 pt-8 border-[#2366B5] focus:outline-none w-full"
              rows={"8"}
              placeholder="Comment"
              {...register("comment", {
                required: {
                  value: true,
                  message: "*Field can't be empty",
                },
              })}
            />
            <label className="label pt-0">
              {errors.comment?.type === "required" && (
                <span className="label-text-alt text-error">
                  {errors.comment.message}
                </span>
              )}
            </label>
          </div>
        </div>
        <div className="mt-5">
          <input
            className="input input-primary w-full lg:w-5/12  focus:outline-none  border-[#2366B5]"
            type="file"
            placeholder="Title"
            {...register("image", {
              required: {
                value: true,
                message: "*Please upload a image",
              },
            })}
          />
          <label className="label pt-0">
            {errors.image?.type === "required" && (
              <span className="label-text-alt text-error">
                {errors.image.message}
              </span>
            )}
          </label>
        </div>
        <button className="block ml-auto btn btn-primary w-full lg:w-5/12 mt-5 bg-[#2366B5] hover:bg-[#0e2e54] border-none text-white">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Review;
