import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo_transparent.png";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");

    navigate("/login");
  };
  return (
    <nav className="bg-blue-600 p-4 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo or Brand */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="MATS Logo"
            className="h-36 md:h-36 lg:h-36 mr-2 transform transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </Link>

        {accessToken && (
          <div
            className={`${isMenuOpen ? "block" : "hidden"} lg:flex space-x-4`}
          >
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-blue-800 py-2 px-4 rounded transition-all"
                  : "text-white hover:bg-blue-700 py-2 px-4 rounded transition-all"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/appts"
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-blue-800 py-2 px-4 rounded transition-all"
                  : "text-white hover:bg-blue-700 py-2 px-4 rounded transition-all"
              }
            >
              Appointments
            </NavLink>
            <NavLink
              to="/meds"
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-blue-800 py-2 px-4 rounded transition-all"
                  : "text-white hover:bg-blue-700 py-2 px-4 rounded transition-all"
              }
            >
              Medicines
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-blue-800 py-2 px-4 rounded transition-all"
                  : "text-white hover:bg-blue-700 py-2 px-4 rounded transition-all"
              }
            >
              Profile
            </NavLink>
            <NavLink
              to="/"
              onClick={logout}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-700 text-white py-2 px-4 rounded transition-all"
                  : "bg-gray-500 text-white hover:bg-gray-700 py-2 px-4 rounded transition-all"
              }
            >
              Logout
            </NavLink>
          </div>
        )}

        {/* Hamburger Menu Button */}
        <button className="lg:hidden text-white text-2xl" onClick={toggleMenu}>
          ☰
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
