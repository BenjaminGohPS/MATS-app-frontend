import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TestTailwind from "./components/TestTailwind";
import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Medicines from "./pages/Medicines";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/NavBar";

const queryClient = new QueryClient();
// src/App.jsx

const App = () => {
  const accessToken = localStorage.getItem("accessToken");

  // if (!accessToken) {
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <div>
          <ToastContainer />

          <NavBar />
          <Routes>
            {/* at start */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* after login */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/appts" element={<Appointments />} />
            <Route path="/meds" element={<Medicines />} />
          </Routes>
        </div>
      </QueryClientProvider>
    </div>
  );
};

export default App;

/* WORKINGS
 <div>
          <div className="bg-blue-500 p-4">
            This is a blue div with padding.
          </div>
          <TestTailwind />
        </div> 
*/
