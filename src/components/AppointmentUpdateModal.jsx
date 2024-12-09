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
  const appointmentId = props.appointment.appointment_id;

  //for testing
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMmVlNWYyOC0zMDNiLTRkYjUtOWFjNS0xNTFhNTNlMzJmZmIiLCJlbWFpbCI6ImJlbmphbWluQGdtYWlsLmNvbSIsInJvbGVfaWQiOjIsImlhdCI6MTczMzY4NTg2OCwiZXhwIjoxNzMzNzM5ODY4LCJqdGkiOiJhNGE2ZTE0OC1iNWRmLTQyOGEtOWI4YS1kMTYyYmMxNDU4ZGIifQ.5jbpuFWHF8K83m-GKaNK3FF462tR8Zx18U6SgiaGMx0";

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
        }),
      }
    );

    if (!res.ok) {
      throw new Error("error updating appointment");
    }
  };

  const { mutate } = useMutation({
    mutationFn: updateAppointments,
    onSuccess: () => {
      queryClient.invalidateQueries(["appointments"]);
      toast.success("Appointment updated successfully");
      props.onClose();
    },
    onError: () => {
      toast.error("Error updating appointments.");
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

        {/* reserve for ADMIN
        <label>End Date: </label>
        <input
          ref={endDateRef}
          type="text"
          defaultValue={endDate}
          className="input-field"
        /> */}

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
