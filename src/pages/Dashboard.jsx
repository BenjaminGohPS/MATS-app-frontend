import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AppointmentCard from "../components/AppointmentCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const accessToken = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("userRole");
  const userId = localStorage.getItem("userId");
  const userEmail = localStorage.getItem("userEmail");

  // If not logged in, redirect to login page
  useEffect(() => {
    if (!accessToken) {
      toast.error("You need to be logged in to access the dashboard.");
      navigate("/login");
    }
  }, [accessToken, navigate]);

  // Fetch appointments based on user role
  const getAppointments = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/MATS/appts", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: "Bearer " + accessToken,
      },
    });

    if (!res.ok) {
      throw new Error("Error getting appointment data");
    }

    const data = await res.json();
    return data;
  };

  const queryAppointments = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
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

  if (queryAppointments.isError) {
    return (
      <div>Error fetching appointments: {queryAppointments.error.message}</div>
    );
  }

  return (
    <div className="p-4 bg-softWhite">
      <h2 className="text-2xl font-bold text-darkGray mb-4">Dashboard</h2>

      {/* Display user details */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-darkGray">
          Welcome back, {userEmail ? userEmail.split("@")[0] : "Guest"}!
        </h3>
        <p className="text-darkGray">
          Role: {userRole === "1" ? "Admin" : "User"}
          <br />
          Email: {userEmail || "No email available"}
          <br />
          User ID: {userId || "No ID available"}
        </p>
      </div>

      {/* Admin-specific features */}
      {userRole === "1" && (
        <div className="mb-4 space-x-4">
          <h3 className="text-lg font-semibold text-darkGray">
            Admin Controls
          </h3>
          <button className="btn-edit " onClick={() => navigate("/appts")}>
            Manage All Appointments
          </button>
          <button className="btn-edit" onClick={() => navigate("/meds")}>
            Manage All Medicines
          </button>
          <button className="btn-edit" onClick={() => navigate("/users")}>
            Manage All Users
          </button>
        </div>
      )}

      {/* Display upcoming appointments */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-darkGray">
          List of Upcoming Appointments
        </h3>
        {queryAppointments.isSuccess && queryAppointments.data.length === 0 ? (
          <p>No upcoming appointments.</p>
        ) : (
          <div>
            {sortedAppointments.map((appointment) => {
              return (
                <AppointmentCard
                  key={appointment.appointment_id}
                  appointment={appointment}
                  onDelete={() => deleteAppointment(appointment.appointment_id)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
