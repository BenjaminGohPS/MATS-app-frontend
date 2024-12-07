import React from "react";

const TestTailwind = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-blue-500">Tailwind is Working!</h1>
        <p className="mt-4 text-lg text-gray-700">
          This is a test to check if Tailwind CSS is working.
        </p>
        <button className="mt-6 px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
          Tailwind Button
        </button>
      </div>
    </div>
  );
};

export default TestTailwind;