"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";



export default function Signup() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading , setLoading] = React.useState(false);

  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const router = useRouter();// to push the user on to new page 

  const onSignup = async () => {

try {
  setLoading(true)
 const response =await axios.post("/api/users/signup", user)
  console.log("signup sucess", response.data)
 router.push("/login")


} catch (error:any) {
  console.log(error);
  toast.error(error.message);

  
}
finally{
  setLoading(false);
}



  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          {loading ? "processing" : "signup"}
        </h1>

        <label
          htmlFor="username"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Username
        </label>

        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          value={user.username}
          onChange={(e) =>
            setUser({
              ...user,
              username: e.target.value,
            })
          }
          className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

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
          className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
          className="mb-6 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        <button
          onClick={onSignup}
          disabled={buttonDisabled}
          className="w-full rounded-lg bg-blue-600 py-2 text-white font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {buttonDisabled ? "NO SIGNUP" : "SIGNUP"}
        </button>

        <Link
          href="/login"
          className="mt-4 block text-center text-blue-600 font-medium hover:text-blue-800 hover:underline"
        >
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}