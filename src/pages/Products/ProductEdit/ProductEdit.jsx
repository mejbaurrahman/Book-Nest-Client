/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import SpecialButton from "../../../components/SpecialButton/SpecialButton";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../context-api/AuthProvider";
import { useRoleCheck } from "../../../hooks/useRoleCheck";

export default function ProductEdit({ id, onClose }) {
  console.log(id);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // If no data, don't render the modal
  const [productEdit, setProductEdit] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://book-nest-server-eight.vercel.app/categories")
      .then(function (response) {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    setLoading2(true);
    if (id) {
      axios
        .get(`https://book-nest-server-eight.vercel.app/products/${id}`)
        .then((response) => {
          console.log(response);
          setProductEdit(response.data);
          setLoading2(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading2(false);
        });
    }
  }, [id]);
  const onSubmit = async (data) => {
    console.log(data);

    if (data?.img[0]) {
      const formData = new FormData();
      console.log(data?.img[0]);
      formData.append("image", data.img[0]);
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
          const productInfo = {
            price: data?.price || productEdit.price,

            book: data?.book || productEdit?.book,
            author: data?.author || productEdit?.author,
            category: data?.category || productEdit?.category,
            pages: data?.pages || productEdit?.pages,
            publishedYear: data?.publishedYear || productEdit?.publishedYear,
            rating: data?.rating || productEdit?.rating,
            img: response.data.data.url || productEdit?.img,
          };
          axios
            .patch(
              `https://book-nest-server-eight.vercel.app/products/${id}`,
              productInfo
            )
            .then(function (response) {
              alert("Product Updated successfully");

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
      const productInfo = {
        price: data?.price || productEdit.price,
        img: productEdit?.img,
        book: data?.book || productEdit?.book,
        author: data?.author || productEdit?.author,
        category: data?.category || productEdit?.category,
        pages: data?.pages || productEdit?.pages,
        publishedYear: data?.publishedYear || productEdit?.publishedYear,
        rating: data?.rating || productEdit?.rating,
      };
      axios
        .patch(
          `https://book-nest-server-eight.vercel.app/products/${id}`,
          productInfo
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
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(URL.createObjectURL(file)); // Preview the image
  };
  if (!id) return null;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg max-h-[90vh] overflow-y-auto w-11/12 md:w-1/2 lg:ms-4">
        <h2 className="text-xl font-bold text-center mb-4">Edit Product</h2>
        {!loading && !loading2 ? (
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
                ) : productEdit?.img ? (
                  <img
                    src={productEdit.img}
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
                {...register("img")}
                onChange={handleImageChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            {errors.img && (
              <span className="text-red-500 text-sm">{errors.img.message}</span>
            )}

            {/* Name Field */}
            <div className="mb-4">
              <input
                type="text"
                defaultValue={productEdit?.book}
                {...register("book", { required: "Book name is required" })}
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
            <div className="mb-4">
              <input
                type="text"
                defaultValue={productEdit?.author}
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
                defaultValue={productEdit?.publishedYear}
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
                defaultValue={productEdit?.pages}
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
                <span className="text-red-500 text-sm">
                  {errors.pages.message}
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="mb-4">
              <input
                type="number"
                step="0.1"
                defaultValue={productEdit?.rating}
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
            <div className="mb-4">
              <input
                type="number"
                defaultValue={productEdit?.price}
                {...register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                })}
                className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.rating ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter Price"
              />
              {errors.price && (
                <span className="text-red-500 text-sm">
                  {errors.price.message}
                </span>
              )}
            </div>

            {/* Review */}
            <div className="mb-4">
              <textarea
                defaultValue={productEdit?.review}
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
                defaultValue={productEdit?.category}
                {...register("category", { required: "Category is required" })}
                className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select category</option>

                {!loading &&
                  categories.map((category) => (
                    <option key={category.index} value={category.category}>
                      {category.category}
                    </option>
                  ))}
              </select>
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
        ) : (
          <div className="flex justify-center items-center">
            <div className="skeleton h-32 w-32 "></div>
          </div>
        )}
      </div>
    </div>
  );
}
