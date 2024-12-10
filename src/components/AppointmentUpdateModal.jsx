import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef } from "react";
import ReactDOM from "react-dom";

import { toast } from "react-toastify";

const OverLay = (props) => {
  const queryClient = useQueryClient();
  const appointmentDateRef = useRef();
  const appointmentTimeRef = useRef();
  const locationRef = useRef();
  const typeRef = useRef();
  const doctorRef = useRef();
  const userIdRef = useRef();

  const appointmentId = props.appointment.appointment_id;
  const accessToken = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("userRole");

  const updateAppointments = async () => {
    const res = await fetch(
      import.meta.env.VITE_SERVER + "/MATS/appts/" + appointmentId,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify({
          appointment_date: appointmentDateRef.current.value,
          appointment_time: appointmentTimeRef.current.value,
          location: locationRef.current.value,
          type: typeRef.current.value,
          doctor: doctorRef.current.value,
          user_id: userRole === "1" ? userIdRef.current.value : undefined,
        }),
      }
    );

    if (!res.ok) {
      throw new Error("error updating appointment");
    }
  };

  const { mutate } = useMutation({
    mutationFn: updateAppointments,
    onSuccess: (data) => {
      console.log("successful update");
      queryClient.invalidateQueries(["appointments"]);
      toast.success(data.msg || "Appointment updated successfully");
      return props.onClose();
    },
    onError: (error) => {
      console.log("mutation error");
      toast.error(error.msg || "Error updating appointments.");
    },
  });

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="text-lg font-semibold text-darkGray mb-2">
          Edit Appointment
        </h2>
        <label>Appointment Date: </label>
        <input
          ref={appointmentDateRef}
          type="text"
          defaultValue={props.appointment.appointment_date}
          className="input-field"
        />
        <label>Appointment Time: </label>
        <input
          ref={appointmentTimeRef}
          type="text"
          defaultValue={props.appointment.appointment_time}
          className="input-field"
        />
        <label>Location: </label>
        <input
          ref={locationRef}
          type="text"
          defaultValue={props.appointment.location}
          className="input-field"
        />
        <label>Type: </label>
        <input
          ref={typeRef}
          type="text"
          defaultValue={props.appointment.type}
          className="input-field"
        />
        <label>Doctor: </label>
        <input
          ref={doctorRef}
          type="text"
          defaultValue={props.appointment.doctor}
          className="input-field"
        />

        {userRole === "1" && (
          <div>
            <label>Assign User ID</label>
            <input
              type="text"
              ref={userIdRef}
              defaultValue={props.appointment.user_id}
              className="border border-lightGray p-2 rounded w-full"
            />
          </div>
        )}
        <div className="modal-footer">
          <button
            onClick={() => {
              mutate();
            }}
            className="btn-confirm"
          >
            Save Changes
          </button>
          <button onClick={props.onClose} className="btn-cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const AppointmentUpdateModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay appointment={props.appointment} onClose={props.onClose} />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default AppointmentUpdateModal;
