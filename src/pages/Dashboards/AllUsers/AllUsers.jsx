/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";

import { useState } from "react";
import UserEdit from "../UserEdit/UserEdit";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

export default function AllUsers() {
  const {
    isPending,
    error,
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://book-nest-server-eight.vercel.app/allUsers").then((res) =>
        res.json()
      ),
  });
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    refetch();
  };

  const handleConfirm = () => {
    console.log("Confirmed!");
    setModalOpen(false);
  };
  const handleButtonClick = (id) => {
    console.log(id);
    const data = id;
    setModalData(data); // Set data to open the modal with specific content
  };

  const closeModal = () => {
    setModalData(null); // Clear data to close the modal
  };
  // Loading state
  if (isLoading) {
    return <div>Loading users...</div>;
  }

  // Error state
  if (error) {
    return <div>Error fetching users: {error.message}</div>;
  }

  // Render categories in a table format
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <div className="lg:w-3/4 md:w-full mx-auto mt-6">
        <h2 className="text-2xl mb-4 text-center uppercase">All Users</h2>
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="w-full bg-gray-200 text-left text-gray-600">
              <th className="py-2 px-4 border">#</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Role</th>
              <th className="py-2 px-4 border">Make Admin</th>
              <th className="py-2 px-4 border">Edit</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data?.map((user, index) => (
                <tr key={user._id} className="border-t">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{user.email}</td>
                  <td className="py-2 px-4 border">{user.role}</td>
                  {user?.role !== "admin" ? (
                    <td className="py-2 px-4 border">
                      <button
                        onClick={handleOpenModal}
                        className="text-2xl text-red-600 px-3 py-2"
                      >
                        <RiAdminLine />
                      </button>
                      <ConfirmModal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        onConfirm={handleConfirm}
                        id={user._id}
                        refetch={refetch}
                      />
                    </td>
                  ) : (
                    <td className="py-2 px-4 border">
                      <button className="text-2xl text-green-700 px-3 py-2 pointer-events-none">
                        <RiAdminLine />
                      </button>
                    </td>
                  )}
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleButtonClick(user._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      <CiEdit />
                    </button>
                    <UserEdit data={modalData} onClose={closeModal} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-2 px-4 border text-center" colSpan={2}>
                  No Users available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
