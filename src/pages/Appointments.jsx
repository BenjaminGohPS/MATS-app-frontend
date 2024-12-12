import React, { useEffect, useRef, useState } from "react";
import AppointmentCard from "../components/AppointmentCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Appointments = () => {
  const queryClient = useQueryClient();
  const appointmentDateRef = useRef();
  const appointmentTimeRef = useRef();
  const locationRef = useRef();
  const typeRef = useRef();
  const doctorRef = useRef();
  const userIdRef = useRef();
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState("");

  const accessToken = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("userRole");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!accessToken) {
      toast.error("You need to be logged in to view this page.");
      navigate("/login");
    }
  }, [accessToken, navigate]);

  const getAppointments = async () => {
    const userIdFromQuery = userRole === "1" ? searchId : userId;

    const res = await fetch(
      `${import.meta.env.VITE_SERVER}/MATS/appts?user_id=${userIdFromQuery}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          authorization: "Bearer " + accessToken,
        },
      }
    );

    if (!res.ok) {
      throw new Error("error getting appointment data");
    }

    const data = await res.json();
    return data;
  };

  const queryAppointments = useQuery({
    queryKey: ["appointments", searchId],
    queryFn: getAppointments,
  });

  const getUsers = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/MATS/users", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: "Bearer " + accessToken,
      },
    });

    if (!res.ok) {
      throw new Error("error getting user data");
    }

    const data = await res.json();
    return data;
  };

  const queryUsers = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    enabled: userRole === "1",
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
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      toast.error(error.msg || "Failed to delete appointment");
    } else {
      queryClient.invalidateQueries(["appointments"]);
    }
  };

  if (queryAppointments.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg
          className="animate-spin h-10 w-10 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V4a10 10 0 00-10 10h2z"
          />
        </svg>
      </div>
    );
  }
  if (queryAppointments.isError)
    return <div>Error: {queryAppointments.error.message}</div>;

  const sortAppointmentsByDate = (appointments) => {
    return appointments.sort((a, b) => {
      const parseDate = (dateStr) => {
        const dateParts = dateStr.split("-");
        if (dateParts.length === 3) {
          return new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`); // Convert to yyyy-mm-dd format
        }
        return new Date(0); // Return a default date in case of invalid format
      };

      const dateA = parseDate(a.appointment_date);
      const dateB = parseDate(b.appointment_date);
      return dateA - dateB; // Sorting from earliest to latest
    });
  };
  const sortedAppointments = queryAppointments.isSuccess
    ? sortAppointmentsByDate(queryAppointments.data)
    : [];

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

        {userRole === "1" &&
        queryUsers.isSuccess &&
        queryUsers.data.length > 0 ? (
          <select
            value={searchId}
            onChange={(event) => {
              setSearchId(event.target.value);
              queryClient.invalidateQueries("appointments");
            }}
            className="border border-lightGray p-2 rounded w-full"
          >
            <option value="">All Appointments</option>
            {queryUsers.data.map((user) => (
              <option key={user.id} value={user.id}>
                {user.id} // {user.email}
              </option>
            ))}
          </select>
        ) : null}

        {sortedAppointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <div>
            {sortedAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.appointment_id}
                appointment={appointment}
                onDelete={() => deleteAppointment(appointment.appointment_id)} // Pass the delete function as a prop
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
