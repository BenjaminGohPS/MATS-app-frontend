import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TestTailwind from "./components/TestTailwind";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Medicines from "./pages/Medicines";

const queryClient = new QueryClient();
// src/App.jsx

const App = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <div>
          <div className="bg-blue-500 p-4">
            This is a blue div with padding.
          </div>
          <TestTailwind />
        </div>

        <div>
          <Routes>
            {/* at start */}
            <Route path="/" element={<LoginPage />} />

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
