import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AppointmentCard from "../components/AppointmentCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const accessToken = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("userRole");
  const userId = localStorage.getItem("userId"); // Assuming user ID is stored in localStorage

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

  //   const {
  //     data: appointments,
  //     isLoading,
  //     isError,
  //     error,
  //   } = useQuery({
  //     queryKey: ["appointments"],
  //     queryFn: getAppointments,
  //   });

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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  //   if (isLoading) return <div>Loading...</div>;
  //   if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4 bg-softWhite">
      <h2 className="text-2xl font-bold text-darkGray mb-4">Dashboard</h2>

      {/* Display user details */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-darkGray">
          Welcome back, {userRole === "1" ? "Admin" : "User"}!
        </h3>
        <p className="text-darkGray">
          Role: {userRole === "1" ? "Admin" : "User"}
          <br />
          User ID: {userId}
        </p>
      </div>

      {/* Display upcoming appointments */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-darkGray">
          Your Upcoming Appointments
        </h3>
        {queryAppointments.isSuccess && queryAppointments.data.length === 0 ? (
          <p>No upcoming appointments.</p>
        ) : (
          <div>
            {queryAppointments.data.map((appointment) => {
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

      {/* Admin-specific features */}
      {userRole === "1" && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-darkGray">
            Admin Controls
          </h3>
          <button className="btn-edit" onClick={() => navigate("/appts")}>
            Manage All Appointments
          </button>
        </div>
      )}

      {/* Logout Button */}
      <div className="mt-4">
        <button onClick={handleLogout} className="btn-cancel">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

// import React from 'react';
// import Medicines from './Medicines';

// const Dashboard = () => {
//     return (
//         <div>
//             <Medicines />
//         </div>
//     );
// };

// export default Dashboard;
