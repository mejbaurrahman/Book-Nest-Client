/* eslint-disable no-unused-vars */

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../context-api/AuthProvider";
import { useRoleCheck } from "../../../hooks/useRoleCheck";
import SpecialButton from "../../../components/SpecialButton/SpecialButton";
import axios from "axios";

const ProfileEdit = () => {
  const { user } = useContext(AuthContext);
  const [loggedUser, loading] = useRoleCheck(user.email);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [profileImage, setProfileImage] = useState(null);

  // Handle form submission
  const onSubmit = async (data) => {
    console.log(data);

    if (data.profileImg[0]) {
      const formData = new FormData();
      console.log(data.profileImg[0]);
      formData.append("image", data.profileImg[0]);
      const imgbbAPIKey = import.meta.env.VITE_IMGBB_API_KEY;

      try {
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Required for file uploads
            },
          }
        );

        if (response.data.success) {
          const profileInfo = {
            name: data.name,
            email: loggedUser.email,
            password: loggedUser?.password,
            phone: data?.phone,
            address: data?.address,
            img: response.data.data.url,
          };
          axios
            .patch(
              `https://book-nest-server-eight.vercel.app/users/${user?.email}`,
              profileInfo
            )
            .then(function (response) {
              alert("User Profile Update successfully");
              reset();
            })
            .catch(function (error) {
              console.log(error);
            });
          // Reset form after successful upload
        } else {
          console.error("Upload failed:", response.data);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      const profileInfo = {
        name: data.name,
        email: loggedUser.email,
        password: loggedUser?.password,
        phone: data?.phone,
        address: data?.address,
        img: loggedUser?.img,
      };
      axios
        .patch(
          `https://book-nest-server-eight.vercel.app/users/${user?.email}`,
          profileInfo
        )
        .then(function (response) {
          alert("User Profile Update successfully");
          reset();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(URL.createObjectURL(file)); // Preview the image
  };

  return (
    <>
      {!loading && (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold text-center mb-4">Edit Profile</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Profile Image Upload */}
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : loggedUser?.img ? (
                  <img
                    src={loggedUser.img}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                {...register("profileImg")}
                onChange={handleImageChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            {errors.img && (
              <span className="text-red-500 text-sm">{errors.img.message}</span>
            )}

            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                defaultValue={loggedUser.name}
                {...register("name", { required: "Name is required" })}
                className={`mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder={loggedUser.name}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email Field (Non-Editable) */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                defaultValue={loggedUser.email}
                {...register("email")}
                className="mt-1 block w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
                disabled
              />
            </div>

            {/* Password Field (Non-Editable) */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                defaultValue={loggedUser.password}
                {...register("password")}
                className="mt-1 block w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
                disabled
              />
            </div>

            {/* Phone Field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                id="phone"
                type="text"
                defaultValue={loggedUser.phone}
                {...register("phone", { required: "Phone number is required" })}
                className={`mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder={loggedUser.phone}
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">
                  {errors.phone.message}
                </span>
              )}
            </div>

            {/* Address Field */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <textarea
                id="address"
                {...register("address", { required: "Address is required" })}
                className={`mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
                placeholder={loggedUser.address}
              />
              {errors.address && (
                <span className="text-red-500 text-sm">
                  {errors.address.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <SpecialButton name="Save Change"></SpecialButton>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ProfileEdit;
