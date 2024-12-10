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

  /* For reference on what is stored backend
      const claims = {
      userId: auth.id,
      email: auth.email,
      role_id: auth.role_id,
    }; 
  */

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

      const userId = decodedToken.id;
      localStorage.setItem("userId", userId);

      console.log("role id:", userRole);
      console.log("user id:", userId);
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
