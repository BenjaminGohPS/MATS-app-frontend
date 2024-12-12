import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo_transparent.png";
import LogoutModal from "./LogoutModal";
import { toast } from "react-toastify";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("userRole");

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully!");
    navigate("/");
    setIsLogoutModalOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Change background after scrolling 50px
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        scrolled ? "bg-blue-900 text-white" : "bg-blue-600 text-white"
      } p-4 sticky top-0 z-50 transition-all duration-300`}
    >
      <div className="flex justify-between items-center">
        {/* Logo or Brand */}
        <Link
          to={accessToken ? "/dashboard" : "/"}
          className="flex items-center"
        >
          <img
            src={logo}
            alt="MATS Logo"
            className="h-36 md:h-36 lg:h-36 mr-2 transform transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </Link>

        {accessToken && (
          <div
            className={`${isMenuOpen ? "block" : "hidden"} lg:flex space-x-0`}
          >
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-blue-500 py-2 px-4 rounded transition-all"
                  : "text-white hover:bg-blue-700 py-2 px-4 rounded transition-all"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/appts"
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-blue-500 py-2 px-4 rounded transition-all"
                  : "text-white hover:bg-blue-700 py-2 px-4 rounded transition-all"
              }
            >
              Appointments
            </NavLink>
            <NavLink
              to="/meds"
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-blue-500 py-2 px-4 rounded transition-all"
                  : "text-white hover:bg-blue-700 py-2 px-4 rounded transition-all"
              }
            >
              Medicines
            </NavLink>

            {userRole === "1" && (
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-blue-500 py-2 px-4 rounded transition-all"
                    : "text-white hover:bg-blue-700 py-2 px-4 rounded transition-all"
                }
              >
                Users
              </NavLink>
            )}

            <button
              onClick={openLogoutModal}
              className="bg-gray-500 text-white hover:bg-gray-700 py-2 px-4 rounded transition-all"
            >
              Logout
            </button>
          </div>
        )}

        {/* Hamburger Menu Button */}
        {accessToken && (
          <button
            className="lg:hidden text-white text-2xl"
            onClick={toggleMenu}
          >
            ☰
          </button>
        )}
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={closeLogoutModal}
        onLogout={handleLogout}
      />
    </nav>
  );
};

export default NavBar;
