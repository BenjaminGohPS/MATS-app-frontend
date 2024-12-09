import { useMutation } from "@tanstack/react-query";
import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode as jwt_decode } from "jwt-decode";

const LoginPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || "/dashboard";

  const login = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const res = await fetch(import.meta.env.VITE_SERVER + "/MATS/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("Error during login");
    }

    const data = await res.json();
    console.log("API response:", data);
    return data;
  };

  const mutationLogin = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("Login data:", data);

      localStorage.setItem("accessToken", data.access);
      toast.success(data.msg || "Login successful");

      const accessToken = localStorage.getItem("accessToken");
      const decodedToken = jwt_decode(accessToken);
      const userRole = decodedToken.role_id;
      localStorage.setItem("userRole", userRole);
      console.log("role id:", userRole);
      navigate(redirectTo, { replace: true });
    },
    onError: (error) => {
      toast.error(error.msg || "Failed to log in. Try again later.");
    },
  });

  return (
    <div className="p-4 bg-softWhite">
      <h2 className="text-2xl font-bold text-darkGray mb-4">Login</h2>

      <div className="space-y-4">
        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          className="border border-lightGray p-2 rounded w-full"
        />

        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="border border-lightGray p-2 rounded w-full"
        />

        <button
          onClick={() => {
            mutationLogin.mutate();
          }}
          className="btn-edit"
        >
          {mutationLogin.isLoading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

/* */
// attempt 2
// const loginUser = async (inputs) => {
//   const res = await fetch(import.meta.env.VITE_SERVER + "/MATS/login", {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify(inputs),
//   });

//   if (!res.ok) {
//     throw new Error("Login failed");
//   }

//   const data = await res.json();
//   return data;
// };
// const { mutate, isLoading, error } = useMutation(loginUser);
// const handleSubmit = async (event) => {
//   event.preventDefault();
//   mutate({ email, password });
// };

// return (
//   <div>
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         value={email}
//         onChange={(event) => setEmail(event.target.value)}
//         required
//         placeholder="Email"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(event) => setPassword(event.target.value)}
//         required
//         placeholder="Password"
//       />
//       <button type="submit" disabled={isLoading}>
//         {isLoading ? "Logging in..." : "Login"}
//       </button>
//     </form>

//     {error && <div>Error: {error.message}</div>}
//   </div>
// );

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

// v2
/*
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
*/
