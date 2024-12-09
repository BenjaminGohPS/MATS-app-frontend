import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import UpdateModal from "./AppointmentUpdateModal";

const AppointmentCard = ({ appointment, onDelete }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const userRole = localStorage.getItem("userRole");

  const handleDelete = () => {
    setShowDeleteConfirm(false);
    toast.success("Appointment deleted!", {
      style: {
        backgroundColor: "#A2D9B1",
        color: "#2C2C2C",
      },
    });
    onDelete(appointment.appointment_id);
  };
  return (
    <div className="p-4 bg-softWhite shadow-md rounded-lg mb-4 border border-lightGray">
      <h3 className="font-bold text-darkGray">
        {appointment.appointment_date}
      </h3>
      <p className="text-darkGray">
        Appointment Time: {appointment.appointment_time}
      </p>
      <p className="text-darkGray">Location: {appointment.location}</p>
      <p className="text-darkGray">Type: {appointment.type}</p>

      {userRole === "1" && (
        <p className="text-darkGray">User ID: {appointment.user_id}</p>
        // <p className="text-darkGray">User email: {appointment.user[0]}</p>
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
          <p className="text-darkGray">Delete this appointment?</p>
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
          appointment={appointment}
          onClose={() => setShowUpdateModal(false)}
        />
      )}
    </div>
  );
};

export default AppointmentCard;

/* WORKINGS


<button
    onClick={() => onEdit(appointment.id)}
    className="text-softBlue hover:text-[#4D8BD9] transition"
>
    <FaEdit /> Edit
</button>
<button
    onClick={() => setShowDeleteConfirm(true)}
    className="text-warmAmber hover:text-[#D88B1F] transition"
>
    <FaTrash /> Delete
</button>
*/
