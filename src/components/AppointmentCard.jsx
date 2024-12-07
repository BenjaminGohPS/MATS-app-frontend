import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const AppointmentCard = ({ appointment, onEdit, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    setShowDeleteConfirm(false);
    toast.success("Appointment deleted!", {
      style: {
        backgroundColor: "#A2D9B1",
        color: "#2C2C2C",
      },
    });
    onDelete(appointment.id);
  };
  return (
    <div className="card p-4">
      <h3 className="font-bold text-darkGray">
        {appointment.appointment_date}
      </h3>
      <p className="text-darkGray">{appointment.appointment_time}</p>
      <p className="text-darkGray">{appointment.location}</p>
      <p className="text-darkGray">{appointment.type}</p>
      <div className="flex justify-between mt-2">
        <button
          onClick={() => onEdit(appointment.id)}
          className="text-softBlue hover:text-[#4D8BD9] transition"
        >
          <FaEdit>Edit</FaEdit>
        </button>

        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="text-warmAmber hover:text=[#D881F] transition"
        >
          <FaEdit>Delete</FaEdit>
        </button>
      </div>
      {showDeleteConfirm && (
        <div className="mt-2">
          <p className="text-darkGray">Delete this appointment?</p>
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
