import React, { useRef } from "react";
import AppointmentCard from "../components/AppointmentCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Appointments = () => {
  const queryClient = useQueryClient();
  const appointmentDateRef = useRef();
  const appointmentTimeRef = useRef();
  const locationRef = useRef();
  const typeRef = useRef();
  const doctorRef = useRef();

  //for testing
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMmVlNWYyOC0zMDNiLTRkYjUtOWFjNS0xNTFhNTNlMzJmZmIiLCJlbWFpbCI6ImJlbmphbWluQGdtYWlsLmNvbSIsInJvbGVfaWQiOjIsImlhdCI6MTczMzY4NTg2OCwiZXhwIjoxNzMzNzM5ODY4LCJqdGkiOiJhNGE2ZTE0OC1iNWRmLTQyOGEtOWI4YS1kMTYyYmMxNDU4ZGIifQ.5jbpuFWHF8K83m-GKaNK3FF462tR8Zx18U6SgiaGMx0";

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
      !doctorRef.current.value

      // reserve for admin
      // !endDateRef.current.value
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
      }),
    });

    if (!res.ok) {
      throw new Error("Error adding appointment");
    }

    const data = await res.json();
    return data;
  };

  const mutationAddAppointment = useMutation({
    mutationFn: addAppointment,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["appointments"]);
      toast.success(data.msg || "Appointment added successfully");
      appointmentDateRef.current.value = "";
      appointmentTimeRef.current.value = "";
      locationRef.current.value = "";
      typeRef.current.value = "";
      doctorRef.current.value = "";
    },
    onError: (error) => {
      toast.error(
        error.msg ||
          "Failed to add appointment. Make sure all fields are entered (to edit)"
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
          {/* leave for admin
          <input
            type="text"
            ref={endDateRef}
            placeholder="End Date"
            className="border border-lightGray p-2 rounded w-full"
          /> */}
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
