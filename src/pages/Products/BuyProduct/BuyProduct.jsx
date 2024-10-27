/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";
import { AuthContext } from "../../../context-api/AuthProvider";
import { useRoleCheck } from "../../../hooks/useRoleCheck";
import SpecialButton from "../../../components/SpecialButton/SpecialButton";
const BuyProduct = ({ data, onClose }) => {
  const { user } = useContext(AuthContext);
  const [loggedUser, loading] = useRoleCheck(user.email);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // If no data, don't render the modal
  const [buyBook, setBuyBook] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  useEffect(() => {
    if (data) {
      axios
        .get(`http://localhost:5000/products/${data}`)
        .then((response) => {
          console.log(response);
          setBuyBook(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [data]);
  const onSubmit = async (data) => {
    console.log(data);

    const profileInfo = {
      bookId: buyBook?._id,
      bookName: buyBook?.book,
      price: buyBook?.price,
      img: buyBook?.img,
      name: loggedUser?.name,
      email: loggedUser?.email,
      phone: loggedUser?.phone,
      address: data?.address,
    };
    axios
      .post(`http://localhost:5000/carts`, profileInfo)
      .then(function (response) {
        alert("Book Added to Cart successfully");

        reset();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(URL.createObjectURL(file)); // Preview the image
  };
  if (!data) return null;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg max-h-[90vh] overflow-y-auto w-11/12 md:w-1/2 lg:ms-4">
        <h2 className="text-xl font-semibold">
          Order for <span className="text-green-700">{buyBook.book}</span>
        </h2>
        <h6 className="mb-3">Price: {buyBook?.price} Taka</h6>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              defaultValue={loggedUser?.name}
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
              defaultValue={user?.email}
              {...register("email")}
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
              defaultValue={loggedUser?.phone}
              {...register("phone")}
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
              defaultValue={loggedUser?.address}
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
            <SpecialButton name="Buy Now"></SpecialButton>

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

export default BuyProduct;
