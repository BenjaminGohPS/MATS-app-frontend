import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="h-screen bg-softBlue flex flex-col justify-center items-center text-white space-y-6">
      <h1 className="text-4xl mb-4">Welcome to the MATS Application</h1>
      <p className="text-xl mb-6">
        Track your appointments and medications easily
      </p>
      <div className="flex space-x-4">
        <button
          onClick={handleSignUp}
          className="bg-gentleGreen px-6 py-2 rounded-lg hover:bg-softGreen"
        >
          Sign Up
        </button>
        <button
          onClick={handleLogin}
          className="bg-warmAmber px-6 py-2 rounded-lg hover:bg-softLavender"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
