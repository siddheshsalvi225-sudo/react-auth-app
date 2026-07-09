"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onForgotPassword = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await axios.post("/api/users/forgotpassword", {
        email,
      });

      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">

        <h1 className="text-3xl font-bold text-center mb-6 text-black">
          Forgot Password
        </h1>

        <label className="block text-black mb-2">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border rounded-md p-3 mb-5 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={onForgotPassword}
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {message && (
          <p className="mt-4 text-center text-green-600">
            {message}
          </p>
        )}

        <div className="mt-5 text-center">
          <Link
            href="/login"
            className="text-blue-600 hover:underline"
          >
            Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}