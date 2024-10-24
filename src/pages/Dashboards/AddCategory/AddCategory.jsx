/* eslint-disable no-undef */
import { useForm } from "react-hook-form";
import SpecialButton from "../../../components/SpecialButton/SpecialButton";
import axios from "axios";

export default function AddCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      // Axios POST request to add category
      const response = await axios.post("http://localhost:5000/categories", {
        category: data.category,
      });
      console.log("Category added:", response.data);
      alert("Category added successfully!");
      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Error adding category");
    }
  };
  return (
    <div className="lg:w-1/2 md:w-1/2 w-full mx-auto m-2 p-6 border rounded-md ">
      <h2 className="text-center text-2xl uppercase mb-4">Add Category</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Category Name Input */}
        <div className="mb-4">
          <input
            id="category"
            type="text"
            {...register("category", { required: "Category name is required" })}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.category ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter category name"
          />
          {errors.category && (
            <span className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </span>
          )}
        </div>

        {/* Submit Button */}

        <SpecialButton name="ADD CATEGORY"></SpecialButton>
      </form>
    </div>
  );
}
