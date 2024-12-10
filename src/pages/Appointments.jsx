import React, { useEffect, useRef } from "react";
import AppointmentCard from "../components/AppointmentCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// const Appointments = ({userRole, accessToken})
const Appointments = () => {
  const queryClient = useQueryClient();
  const appointmentDateRef = useRef();
  const appointmentTimeRef = useRef();
  const locationRef = useRef();
  const typeRef = useRef();
  const doctorRef = useRef();
  const userIdRef = useRef();
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("userRole");
  const userId = localStorage.getItem("userId"); // not working yet

  // checking roles
//   console.log(userRole);
//   console.log(userId);

  useEffect(() => {
    if (!accessToken) {
      toast.error("You need to be logged in to view this page.");
      navigate("/login");
    }
  }, [accessToken, navigate]);

  const getAppointments = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/MATS/appts", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: "Bearer " + accessToken,
      },
    });

    if (!res.ok) {
      throw new Error("error getting appointment data");
    }

    const data = await res.json();
    return data;
  };

  const queryAppointments = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });

  // add appointment
  const addAppointment = async () => {
    if (
      !appointmentDateRef.current.value ||
      !appointmentTimeRef.current.value ||
      !locationRef.current.value ||
      !typeRef.current.value ||
      !doctorRef.current.value ||
      (userRole === "1" && !userIdRef.current.value) // reserve for admin
    ) {
      return;
    }

    const res = await fetch(import.meta.env.VITE_SERVER + "/MATS/appts", {
      method: "PUT",
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
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error adding appointment");
    }

    const data = await res.json();
    return data;
  };

  const mutationAddAppointment = useMutation({
    mutationFn: addAppointment,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["appointments"]);
      toast.success(data.msg || "Appointment added successfully");
      //   appointmentDateRef.current.value = "";
      //   appointmentTimeRef.current.value = "";
      //   locationRef.current.value = "";
      //   typeRef.current.value = "";
      //   doctorRef.current.value = "";
      //   userIdRef.current.value = "";

      if (appointmentDateRef.current) appointmentDateRef.current.value = "";
      if (appointmentTimeRef.current) appointmentTimeRef.current.value = "";
      if (locationRef.current) locationRef.current.value = "";
      if (typeRef.current) typeRef.current.value = "";
      if (doctorRef.current) doctorRef.current.value = "";
      if (userIdRef.current) userIdRef.current.value = "";
    },
    onError: (error) => {
      toast.error(
        error.msg ||
          "Failed to add appointment. Make sure all fields are entered."
      );
    },
  });

  // delete appointment
  const deleteAppointment = async (appointmentId) => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/MATS/appts", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({
        id: appointmentId,
        // user_id: userRole === "1" ? userIdRef.current.value : undefined,
        // no need, because I can see all appointments as admin
        // same as medicine, need to have extra field here to delete for user.
        // user_id: userId,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      toast.error(error.msg || "Failed to delete appointment");
    } else {
      queryClient.invalidateQueries(["appointments"]);
    }
  };

  if (queryAppointments.isLoading) return <div>Loading appointments...</div>;
  if (queryAppointments.isError)
    return <div>Error: {queryAppointments.error.message}</div>;

  return (
    <div className="p-4 bg-softWhite">
      <h2 className="text-2xl font-bold text-darkGray mb-4">Appointments</h2>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-darkGray mb-2">
          Add Appointment
        </h3>
        <div className="space-y-2">
          <input
            type="text"
            ref={appointmentDateRef}
            placeholder="Appointment Date"
            className="border border-lightGray p-2 rounded w-full"
          />
          <input
            type="text"
            ref={appointmentTimeRef}
            placeholder="Appointment Time"
            className="border border-lightGray p-2 rounded w-full"
          />
          <input
            type="text"
            ref={locationRef}
            placeholder="Location"
            className="border border-lightGray p-2 rounded w-full"
          />
          <input
            type="text"
            ref={typeRef}
            placeholder="Type"
            className="border border-lightGray p-2 rounded w-full"
          />
          <input
            type="text"
            ref={doctorRef}
            placeholder="Doctor"
            className="border border-lightGray p-2 rounded w-full"
          />

          {userRole === "1" && (
            <div>
              <label>Assign User ID</label>
              <input
                type="text"
                ref={userIdRef}
                placeholder="User ID"
                className="border border-lightGray p-2 rounded w-full"
              />
            </div>
          )}

          <button
            onClick={() => {
              mutationAddAppointment.mutate();
            }}
            className="btn-edit"
          >
            Add Appointment
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-darkGray mb-2">
          Your Appointments
        </h3>
        {queryAppointments.isSuccess && queryAppointments.data.length === 0 ? (
          <p>No appointment found.</p>
        ) : (
          <div>
            {queryAppointments.data.map((appointment) => {
              return (
                <AppointmentCard
                  key={appointment.appointment_id}
                  appointment={appointment}
                  onDelete={() => deleteAppointment(appointment.appointment_id)} // Pass the delete function as a prop
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
