import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import UpdateModal from "./MedicinesUpdateModal";

const MedicineCard = ({ medicine, onDelete, quantity, dosage }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const userRole = localStorage.getItem("userRole");

  const handleDelete = () => {
    setShowDeleteConfirm(false);
    toast.success("Medicine deleted!", {
      style: {
        backgroundColor: "A2D9B1",
        color: "#2C2C2C",
      },
    });
    onDelete(medicine.medicine_id);
  };
  return (
    <div className="p-4 bg-softWhite shadow-md rounded-lg mb-4 border border-lightGray">
      <h3 className="font-bold text-darkGray">{medicine.medicine_name}</h3>
      <p className="text-darkGray">Quantity: {quantity}</p>
      <p className="text-darkGray">Dosage: {dosage}</p>
      <p className="text-darkGray">Expiry: {medicine.medicine_expiry}</p>

      {userRole === "1" && (
        <>
          <p className="text-darkGray">
            User ID: {medicine.medicines_users?.[0]?.user_id}
          </p>

          <p className="text-darkGray">
            User Email: {medicine.medicines_users?.[0]?.user?.email}
          </p>
        </>
      )}

      <div className="flex justify-between mt-2">
        <button onClick={() => setShowUpdateModal(true)} className="btn-edit">
          <FaEdit>Edit</FaEdit>
        </button>

        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="btn-delete"
        >
          <FaTrash>Delete</FaTrash>
        </button>
      </div>
      {showDeleteConfirm && (
        <div className="mt-2">
          <p className="text-darkGray bg-softLavender">Delete this medicine?</p>
          <div className="flex justify-between">
            <button onClick={handleDelete} className="btn-confirm">
              Yes
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="btn-cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showUpdateModal && (
        <UpdateModal
          medicine={medicine}
          quantity={quantity}
          dosage={dosage}
          onClose={() => setShowUpdateModal(false)}
        />
      )}
    </div>
  );
};

export default MedicineCard;
