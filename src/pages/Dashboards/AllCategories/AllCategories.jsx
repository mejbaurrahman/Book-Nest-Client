/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

export default function AllCategories() {
  const { isPending, error, data, isLoading, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch("http://localhost:5000/categories").then((res) => res.json()),
  });

  // Loading state
  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  // Error state
  if (error) {
    return <div>Error fetching categories: {error.message}</div>;
  }

  // Render categories in a table format
  return (
    <div className="lg:w-3/4 md:w-full mx-auto mt-6">
      <h2 className="text-2xl mb-4 text-center uppercase">All Categories</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="w-full bg-gray-200 text-left text-gray-600">
            <th className="py-2 px-4 border">#</th>
            <th className="py-2 px-4 border">Category Name</th>
            <th className="py-2 px-4 border">Delete</th>
            <th className="py-2 px-4 border">Edit</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data?.map((category, index) => (
              <tr key={category._id} className="border-t">
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{category.category}</td>
                <td className="py-2 px-4 border">
                  <button className="text-2xl text-red-600 px-3 py-2">
                    <MdDelete />
                  </button>
                </td>
                <td className="py-2 px-4 border">
                  <button className="text-2xl text-orange-400 px-3 py-2">
                    <CiEdit />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-2 px-4 border text-center" colSpan={2}>
                No categories available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
