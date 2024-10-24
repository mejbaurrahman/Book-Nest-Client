import { useState } from "react";
import { useForm } from "react-hook-form";
import SpecialButton from "../../../components/SpecialButton/SpecialButton";

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="lg:w-1/2 md:w-1/2 w-full mx-auto m-2 p-6 border rounded-md">
      <h2 className="text-center text-2xl uppercase mb-4">Add Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Book Name */}
        <div className="mb-4">
          <input
            type="text"
            {...register("bookName", { required: "Book name is required" })}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.bookName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter book name"
          />
          {errors.bookName && (
            <span className="text-red-500 text-sm">
              {errors.bookName.message}
            </span>
          )}
        </div>

        {/* Author */}
        <div className="mb-4">
          <input
            type="text"
            {...register("author", { required: "Author name is required" })}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.author ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter author name"
          />
          {errors.author && (
            <span className="text-red-500 text-sm">
              {errors.author.message}
            </span>
          )}
        </div>

        {/* Published Year */}
        <div className="mb-4">
          <input
            type="number"
            {...register("publishedYear", {
              required: "Published year is required",
              valueAsNumber: true,
            })}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.publishedYear ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter published year"
          />
          {errors.publishedYear && (
            <span className="text-red-500 text-sm">
              {errors.publishedYear.message}
            </span>
          )}
        </div>

        {/* Pages */}
        <div className="mb-4">
          <input
            type="number"
            {...register("pages", {
              required: "Page count is required",
              valueAsNumber: true,
            })}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.pages ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter number of pages"
          />
          {errors.pages && (
            <span className="text-red-500 text-sm">{errors.pages.message}</span>
          )}
        </div>

        {/* Rating */}
        <div className="mb-4">
          <input
            type="number"
            step="0.1"
            {...register("rating", {
              required: "Rating is required",
              min: 0,
              max: 5,
            })}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.rating ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter rating (0-5)"
          />
          {errors.rating && (
            <span className="text-red-500 text-sm">
              {errors.rating.message}
            </span>
          )}
        </div>

        {/* Review */}
        <div className="mb-4">
          <textarea
            {...register("review", { required: "Review is required" })}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.review ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter review"
            rows="4"
          />
          {errors.review && (
            <span className="text-red-500 text-sm">
              {errors.review.message}
            </span>
          )}
        </div>

        {/* Category (Selection Field) */}
        <div className="mb-4">
          <select
            {...register("category", { required: "Category is required" })}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.category ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select category</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Biography">Biography</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Religion">Religion</option>
          </select>
          {errors.category && (
            <span className="text-red-500 text-sm">
              {errors.category.message}
            </span>
          )}
        </div>

        {/* Book Cover Image Upload */}
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            {...register("bookCover", { required: "Book cover is required" })}
            onChange={handleImageUpload}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.bookCover && (
            <span className="text-red-500 text-sm">
              {errors.bookCover.message}
            </span>
          )}

          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Book Cover Preview"
                className="h-40 object-cover"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <SpecialButton name="ADD PRODUCT"></SpecialButton>
      </form>
    </div>
  );
}
