"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/login", user);

      console.log(response.data);

      toast.success("Login Successful");

      router.push("/profile");
    } catch (error: any) {
      console.log(error);

      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          {loading ? "Processing..." : "Login"}
        </h1>

        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Email
        </label>

        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={user.email}
          onChange={(e) =>
            setUser({
              ...user,
              email: e.target.value,
            })
          }
          className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Password
        </label>

        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={user.password}
          onChange={(e) =>
            setUser({
              ...user,
              password: e.target.value,
            })
          }
          className="mb-6 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        <button
          onClick={onLogin}
          disabled={buttonDisabled || loading}
          className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {buttonDisabled ? "LOGIN HERE ..." : "Login"}
        </button>

        <Link
          href="/signup"
          className="mt-4 block  content-center text-center font-medium text-blue-600 hover:text-blue-800 hover:underline"
        >
          Move to Signup Page
        </Link>
        <div className="flex justify-center mt-4">
  <Link
    href="/forgotpassword"
    className="text-blue-600 hover:underline"
  >
    Forgot Password?
  </Link>
</div>
      </div>
    </div>
  );
}