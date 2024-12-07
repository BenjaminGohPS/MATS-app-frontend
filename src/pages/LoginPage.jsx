import { useMutation } from "@tanstack/react-query";
import React from "react";

// const login = async(info);

const LoginPage = () => {
  return (
    <>
      <form className="space-y-4">
        <input
          type="email"
          name="email"
          className="input"
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          className="input"
          placeholder="Password"
          required
        />
        <button type="submit" className="btn">
          Login
        </button>
        <a href="/forgot-password" className="text-sm">
          Forgot password?
        </a>
      </form>
    </>
  );
};

export default LoginPage;

// attempt 1
// import React, { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const loginUser = async (credentials) => {
//   const response = await fetch(import.meta.env.VITE_SERVER + "/MATS/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(credentials),
//   });

//   const data = await res.json();
//   if (!res.ok) {
//     throw new Error(data.message || "Login failed");
//   }
//   return data;
// };

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const { mutate, isLoading, error } = useMutation(loginUser, {
//     onSuccess: (data) => {
//       localStorage.setItem("accessToken", data.access); // Store token in localStorage
//       const decoded = jwtDecode(data.access);
//       navigate("/appointments"); // Redirect to appointments page
//     },
//     onError: (err) => {
//       toast.error(err.message); // Show error message
//     },
//   });

//   const handleLogin = (e) => {
//     e.preventDefault();
//     mutate({ email, password });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-softWhite">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
//         <h2 className="text-2xl font-bold text-darkGray mb-4">Login</h2>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-2 border border-lightGray rounded-md"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-2 border border-lightGray rounded-md"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full py-2 bg-softBlue text-white rounded-md hover:bg-blue-600"
//             disabled={isLoading}
//           >
//             {isLoading ? "Logging In..." : "Login"}
//           </button>
//         </form>
//         {error && <div className="text-red-500 mt-2">{error.message}</div>}
//         <ToastContainer />
//       </div>
//     </div>
//   );
// };
// export default LoginPage;
