/* eslint-disable no-unused-vars */

import { useForm } from "react-hook-form";
import SpecialButton from "../../../components/SpecialButton/SpecialButton";
import { useState } from "react";
import axios from "axios";

/* eslint-disable react/prop-types */
function ConfirmModal({ isOpen, onClose, onConfirm, id, refetch }) {
  console.log(id);
  const [userEdit, setUserEdit] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleCreateAdmin = () => {
    console.log("start Working");
    if (id) {
      axios
        .patch(`http://localhost:5000/user/${id}`, { role: "admin" })
        .then((response) => {
          alert("User Created Admin successfully");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  //   const onSubmit = async (data) => {};
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg max-h-[90vh] overflow-y-auto w-11/12 md:w-1/2 lg:ms-4">
        <h2 className="text-xl font-bold">Are You Want to Make Admin?</h2>

        <div className="lg:flex justify-end items-center">
          <button
            onClick={handleCreateAdmin}
            className="text-2xl text-red-600 px-3 py-2"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="ms-3 bg-red-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
