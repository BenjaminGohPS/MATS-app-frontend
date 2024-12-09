import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo_transparent.png";


const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 p-4 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo or Brand */}
        <Link to="/dashboard" className="flex items-center">
          <img
            src={logo}
            alt="MATS Logo"
            className="h-36 md:h-36 lg:h-36 mr-2 transform transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </Link>

        {/* Navbar Links */}
        <div className={`${isMenuOpen ? "block" : "hidden"} lg:flex space-x-4`}>
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
            to="/logout"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-700 text-white py-2 px-4 rounded transition-all"
                : "bg-gray-500 text-white hover:bg-gray-700 py-2 px-4 rounded transition-all"
            }
          >
            Logout
          </NavLink>
        </div>

        {/* Hamburger Menu Button */}
        <button className="lg:hidden text-white text-2xl" onClick={toggleMenu}>
          ☰
        </button>
      </div>
    </nav>
  );
};

export default NavBar;

/*
 <li className="col-md">
    <NavLink
        className={(navData) => (navData.isActive ? styles.active : "")}
        to="/about"
    >
        About
    </NavLink>
    </li>
*/

/*
[navbar]

import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

const Navbar = ({ userRole }) => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-bold">MedTrack</Link>
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-blue-300">Home</Link>
            <Link to="/medications" className="hover:text-blue-300">Medications</Link>
            <Link to="/appointments" className="hover:text-blue-300">Appointments</Link>
            {userRole === 1 && (
              <Link to="/admin" className="hover:text-blue-300">Admin</Link>
            )}
          </div>
        </div>
//         {/* Mobile menu */
//         <div className="md:hidden">
//           <button className="text-xl">☰</button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// ===========

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = ({ userRole }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <nav className="bg-blue-600 text-white p-4">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         <div className="flex items-center space-x-4">
//           <Link to="/" className="text-xl font-bold">MedTrack</Link>
//           <div className="hidden md:flex space-x-6">
//             <Link to="/" className="hover:text-blue-300">Home</Link>
//             <Link to="/medications" className="hover:text-blue-300">Medications</Link>
//             <Link to="/appointments" className="hover:text-blue-300">Appointments</Link>
//             {userRole === 1 && (
//               <Link to="/admin" className="hover:text-blue-300">Admin</Link>
//             )}
//           </div>
//         </div>
//         {/* Mobile menu */}
//         <div className="md:hidden">
//           <button onClick={toggleMenu} className="text-xl">☰</button>
//         </div>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
//         <div className="bg-blue-700 p-4 space-y-4">
//           <Link to="/" className="block text-white">Home</Link>
//           <Link to="/medications" className="block text-white">Medications</Link>
//           <Link to="/appointments" className="block text-white">Appointments</Link>
//           {userRole === 1 && (
//             <Link to="/admin" className="block text-white">Admin</Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
