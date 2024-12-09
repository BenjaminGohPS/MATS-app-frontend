import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ userRole }) => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* <NavLink
            className={(navData) => (navData.isActive ? StyleSheet.active : "")}
            to="/meds"
          >
            Medicines
          </NavLink> */}
          <Link to="/meds" className="text-xl font-bold">
            MATS
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link to="/dashboard" className="hover:text-blue-300">
              Home
            </Link>
            <Link to="/appts" className="hover:text-blue-300">
              Appointments
            </Link>
            <Link to="/meds" className="hover:text-blue-300">
              Medicines
            </Link>
            {userRole === 1 && (
              <Link to="/meds" className="hover:text-blue-300">
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

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

export default NavBar;

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
