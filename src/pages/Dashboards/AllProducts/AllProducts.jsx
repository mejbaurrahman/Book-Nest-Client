/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import ProductEdit from "../../Products/ProductEdit/ProductEdit";

export default function AllProducts() {
  const [modalData, setModalData] = useState(null);
  const { isPending, error, data, isLoading, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("http://localhost:5000/products").then((res) => res.json()),
  });

  // Loading state
  if (isLoading) {
    return <div>Loading Products...</div>;
  }

  // Error state
  if (error) {
    return <div>Error fetching Products: {error.message}</div>;
  }

  const handleButtonClick = (id) => {
    console.log(id);
    const data = id;
    setModalData(data); // Set data to open the modal with specific content
  };

  const closeModal = () => {
    setModalData(null); // Clear data to close the modal
    window.location.reload();
  };
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmed) {
      try {
        await axios
          .delete(`http://localhost:5000/products/${id}`)
          .then(function (response) {
            if (response) {
              toast.success("Product deleted successfully!");
              refetch();
            }
          });
      } catch (error) {
        console.error("Error deleting item:", error);
        toast.error("Failed to delete item. Please try again.");
      }
    }
  };
  // Render categories in a table format
  return (
    <div className="lg:w-3/4 md:w-full mx-auto mt-6">
      <h2 className="text-2xl mb-4 text-center uppercase">All Categories</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="w-full bg-gray-200 text-left text-gray-600">
            <th className="py-2 px-4 border">#</th>
            <th className="py-2 px-4 border">Photo</th>
            <th className="py-2 px-4 border">Product Name</th>
            <th className="py-2 px-4 border">Delete</th>
            <th className="py-2 px-4 border">Edit</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data?.map((product, index) => (
              <tr key={product._id} className="border-t">
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border w-1/4">
                  <img src={product.img} className="w-1/2 rounded-md" />
                </td>
                <td className="py-2 px-4 border">{product.book}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-2xl text-red-600 px-3 py-2"
                  >
                    <MdDelete />
                  </button>
                </td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleButtonClick(product._id)}
                    className="text-2xl text-orange-400 px-3 py-2"
                  >
                    <CiEdit />
                  </button>
                  <ProductEdit
                    id={modalData}
                    onClose={closeModal}
                    refetch={refetch}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-2 px-4 border text-center" colSpan={2}>
                No Product available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
