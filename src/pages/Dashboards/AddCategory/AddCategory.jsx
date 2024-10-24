import { useForm } from "react-hook-form";
import SpecialButton from "../../../components/SpecialButton/SpecialButton";

export default function AddCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Here you can handle the submission of the form data, e.g., make an API call
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
