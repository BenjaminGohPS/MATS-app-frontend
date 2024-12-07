import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const MedicineCard = ({ medicine, onEdit, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const handleDelete = () => {
    setShowDeleteConfirm(false);
    toast.success("Medicine deleted!", {
      style: {
        backgroundColor: "A2D9B1",
        color: "#2C2C2C",
      },
    });
    onDelete(medicine.id);
  };
  return (
    <div className="p-4 bg-softWhite shadow-md rounded-lg mb-4 border border-lightGray">
      <h3 className="font-bold text-darkGray">{medicine.medicine_name}</h3>
      <p className="text-darkGray">Quantity: {medicine.quantity}</p>
      <p className="text-darkGray">Dosage: {medicine.daily_dosage}</p>
      <p className="text-darkGray">Expiry: {medicine.medicine_expiry}</p>
      <div className="flex justify-between mt-2">
        <button
          onClick={() => onEdit(medicine.id)}
          className="text-softBlue hover:text-[#4D8BD9] transition"
        >
          <FaEdit>Edit</FaEdit>
        </button>

        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="text-warmAmber hover:text=[#D88B1F] transition"
        >
          <FaTrash>Delete</FaTrash>
        </button>
      </div>
      {showDeleteConfirm && (
        <div className="mt-2">
          <p className="text-darkGray">Delete this medicine?</p>
          <div classNam="flex justify-between">
            <button
              onClick={handleDelete}
              className="bg-warmAmber text-darkGray px-4 py-2 rounded hover:bg-[#D88B1F]"
            >
              Yes
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="bg-lightGray text-darkGray px-4 py-2 rounded hover:bg-[#C1C6CB]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineCard;
