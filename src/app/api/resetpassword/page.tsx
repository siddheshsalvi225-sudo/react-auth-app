"use client";

import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Get token from URL
  useEffect(() => {
    const urlToken = searchParams.get("token");

    if (urlToken) {
      setToken(urlToken);
    }
  }, [searchParams]);

  // Submit new password
  const resetPassword = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/resetpassword", {
        token,
        password,
      });

      setMessage(response.data.message);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">

        <h1 className="text-3xl font-bold text-center mb-6 text-black">
          Reset Password
        </h1>

        <label className="block mb-2 text-black">
          New Password
        </label>

        <input
          type="password"
          placeholder="Enter new password"
          className="w-full border rounded-md p-3 mb-5 text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={resetPassword}
          disabled={loading}
          className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700"
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>

        {message && (
          <p className="mt-4 text-center text-blue-600">
            {message}
          </p>
        )}

      </div>
    </div>
  );
}