/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../context-api/AuthProvider";
import { useRoleCheck } from "../../../hooks/useRoleCheck";
import SpecialButton from "../../../components/SpecialButton/SpecialButton";
import axios from "axios";
const UserEdit = ({ data, onClose }) => {
  console.log(data);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // If no data, don't render the modal
  const [userEdit, setUserEdit] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  useEffect(() => {
    if (data) {
      axios
        .get(`http://localhost:5000/users/${data}`)
        .then((response) => {
          console.log(response);
          setUserEdit(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [data]);
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
            email: userEdit.email,
            password: userEdit.password,
            phone: data?.phone,
            address: data?.address,
            img: response.data.data.url,
          };
          axios
            .patch(
              `http://localhost:5000/users/${userEdit?.email}`,
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
        email: userEdit.email,
        password: userEdit?.password,
        phone: data?.phone,
        address: data?.address,
        img: userEdit?.img,
      };
      axios
        .patch(`http://localhost:5000/users/${userEdit?.email}`, profileInfo)
        .then(function (response) {
          alert("User Profile Update successfully");

          reset();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(URL.createObjectURL(file)); // Preview the image
  };
  if (!data) return null;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg max-h-[90vh] overflow-y-auto w-11/12 md:w-1/2 lg:ms-4">
        <h2 className="text-xl font-bold">Edit Profile</h2>
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
              ) : userEdit?.img ? (
                <img
                  src={userEdit.img}
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
              {...register("name", { required: "Name is required" })}
              defaultValue={userEdit?.name}
              className={`mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
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
              defaultValue={userEdit.email}
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
              defaultValue={userEdit.password}
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
              defaultValue={userEdit?.phone}
              {...register("phone", {
                required: "Phone number is required",
              })}
              className={`mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
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
              defaultValue={userEdit?.address}
              {...register("address", { required: "Address is required" })}
              className={`mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.address && (
              <span className="text-red-500 text-sm">
                {errors.address.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="lg:flex md:flex justify-end items-center">
            <SpecialButton name="Save Change"></SpecialButton>

            <button
              onClick={onClose}
              className="ms-3 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;
