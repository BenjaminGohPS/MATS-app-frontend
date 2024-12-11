import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef } from "react";
import ReactDOM from "react-dom";

import { toast } from "react-toastify";

const OverLay = (props) => {
  const queryClient = useQueryClient();
  const medicineNameRef = useRef();
  const medicineExpiryRef = useRef();
  const quantityRef = useRef();
  const dosageRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const medicineId = props.medicine.medicine_id;
  const startDate = props.medicine.medicines_users[0].start_date;
  const endDate = props.medicine.medicines_users[0].end_date;
  const accessToken = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("userRole");
  const userId = localStorage.getItem("userId");

  const updateMedicines = async () => {
    const res = await fetch(
      import.meta.env.VITE_SERVER + "/MATS/meds/" + medicineId,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify({
          medicine_name: medicineNameRef.current.value,
          medicine_expiry: medicineExpiryRef.current.value,
          quantity: quantityRef.current.value,
          daily_dosage: dosageRef.current.value,
          start_date: startDateRef.current.value,
          end_date: endDateRef.current.value,
          user_id:
            userRole === "1"
              ? props.medicine.medicines_users?.[0]?.user_id
              : userId,
        }),
      }
    );
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "error updating medicine");
    }

    const data = await res.json();
    return data;
  };

  const { mutate } = useMutation({
    mutationFn: updateMedicines,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["medicines"]);
      toast.success(data.msg || "Medicine updated successfully!");
      props.onClose();
    },
    onError: (error) => {
      toast.error(error.msg || "Error updating medicine.");
    },
  });

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="text-lg font-semibold text-darkGray mb-2">
          Edit Medicine
        </h2>
        <label>Name: </label>
        <input
          ref={medicineNameRef}
          type="text"
          defaultValue={props.medicine.medicine_name}
          className="input-field"
        />
        <label>Expiry: </label>
        <input
          ref={medicineExpiryRef}
          type="text"
          defaultValue={props.medicine.medicine_expiry}
          className="input-field"
        />
        <label>Quantity: </label>
        <input
          ref={quantityRef}
          type="text"
          defaultValue={props.quantity}
          className="input-field"
        />
        <label>Daily Dosage: </label>
        <input
          ref={dosageRef}
          type="text"
          defaultValue={props.dosage}
          className="input-field"
        />
        <label>Start Date: </label>
        <input
          ref={startDateRef}
          type="text"
          defaultValue={startDate}
          className="input-field"
        />
        <label>End Date: </label>
        <input
          ref={endDateRef}
          type="text"
          defaultValue={endDate}
          className="input-field"
        />

        {userRole === "1" && (
          <div>
            <label>Assign User ID: </label>
            <span>{props.medicine.medicines_users?.[0]?.user_id}</span>
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

const MedicinesUpdateModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          medicine={props.medicine}
          quantity={props.quantity}
          dosage={props.dosage}
          onClose={props.onClose}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default MedicinesUpdateModal;
