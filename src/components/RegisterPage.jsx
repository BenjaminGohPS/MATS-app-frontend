import { useMutation } from "@tanstack/react-query";
import React, { useRef } from "react";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const register = async () => {
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

    const res = await fetch(import.meta.env.VITE_SERVER + "/MATS/register", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("Error during registration");
    }

    const data = await res.json();
    return data;
  };

  const mutationRegister = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      toast.success(data.msg || "Registration successful! Please log in.");
      emailRef.current.value = "";
      passwordRef.current.value = "";
    },
    onError: (error) => {
      toast.error(error.message || "Failed to register. Try again later.");
    },
  });

  return (
    <div className="p-4 bg-softWhite">
      <h2 className="text-2xl font-bold text-darkGray mb-4">Register</h2>

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
            mutationRegister.mutate();
          }}
          className="btn-edit"
        >
          {mutationRegister.isLoading ? "Registering..." : "Register"}
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;

/* WORKINGS

const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    mutationRegister.mutate(); // Trigger the mutation
  };

  return (
    <div className="p-4 bg-softWhite">
      <h2 className="text-2xl font-bold text-darkGray mb-4">Register</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          ref={emailRef} // Use ref to get the email value
          type="email"
          placeholder="Email"
          className="border border-lightGray p-2 rounded w-full"
        />

        <input
          ref={passwordRef} // Use ref to get the password value
          type="password"
          placeholder="Password"
          className="border border-lightGray p-2 rounded w-full"
        />

        <button
          type="submit"
          disabled={mutationRegister.isLoading}
          className="btn-edit"
        >
          {mutationRegister.isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );


==========================
<div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          placeholder="Email"
        />

        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          placeholder="Password"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>

      {error && <div>Error: {error.message}</div>}
    </div>

*/
