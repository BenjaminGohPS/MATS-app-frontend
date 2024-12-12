import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo_transparent.png";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-softBlue to-softLavender flex flex-col justify-center items-center text-white space-y-6 relative px-6">
      <div className="absolute inset-0 bg-black opacity-5"></div>
      <img
        src={logo}
        alt="Logo"
        className="mb-4 mt-0 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
      />

      <h1 className="text-5xl font-extrabold text-center mb-4 animate__animated animate__fadeIn animate__delay-1s">
        Welcome to the MATS Application
      </h1>
      <p className="text-xl text-center mb-6 max-w-md animate__animated animate__fadeIn animate__delay-2s">
        Track your appointments and medications easily and efficiently with our
        easy-to-use system.
      </p>

      <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0 animate__animated animate__fadeIn animate__delay-3s">
        <button
          onClick={handleSignUp}
          className="bg-gentleGreen px-8 py-3 rounded-lg shadow-lg text-lg font-semibold hover:bg-softGreen transition duration-300 ease-in-out transform hover:scale-105"
        >
          Sign Up
        </button>
        <button
          onClick={handleLogin}
          className="bg-warmAmber px-8 py-3 rounded-lg shadow-lg text-lg font-semibold hover:bg-softLavender transition duration-300 ease-in-out transform hover:scale-105"
        >
          Log In
        </button>
      </div>

      <footer className="text-sm text-softWhite mt-auto z-50">
        <p>&copy; 2024 MATS Application. All rights reserved.</p>
        <p>
          Created by{" "}
          <a href="mailto:benjamingohps@gmail.com" className="text-darkGray">
            Benjamin Goh
          </a>
          . Connect with me on{" "}
          <a
            href="https://www.linkedin.com/in/benjamin-goh-ps"
            className="text-darkGray"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          .
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
