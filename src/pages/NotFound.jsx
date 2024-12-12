import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-softWhite text-darkGray">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-warmAmber">404</h1>
        <h2 className="text-2xl mt-4 text-darkGray">
          Oops! Page Not Found
        </h2>
        <p className="mt-2 text-darkGray">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-2 text-white bg-softBlue rounded-md hover:bg-softGreen"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
