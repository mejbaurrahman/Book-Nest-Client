/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";
import SpecialButton from "../../../../components/SpecialButton/SpecialButton";
const CategoryEdit = ({ id, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // If no data, don't render the modal
  const [cEdit, setCEdit] = useState({});

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/category/${id}`)
        .then((response) => {
          console.log(response);
          setCEdit(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);
  const onSubmit = async (data) => {
    console.log(data);

    const cInfo = {
      category: data.category || cEdit?.category,
    };
    axios
      .patch(`http://localhost:5000/categories/${id}`, cInfo)
      .then(function (response) {
        alert("Category Update successfully");

        reset();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  if (!id) return null;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg max-h-[90vh] overflow-y-auto w-11/12 md:w-1/2 lg:ms-4">
        <h2 className="text-xl font-bold">Edit Category</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Phone Field */}
          <div>
            <label
              htmlFor="Category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <input
              id="category"
              type="text"
              placeholder={cEdit?.category}
              {...register("category", {})}
              className={`mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.category && (
              <span className="text-red-500 text-sm">
                {errors.category.message}
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

export default CategoryEdit;
