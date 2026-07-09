"use client";

import axios from "axios";
import { link } from "fs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import React, { useState } from "react";
import toast from "react-hot-toast";


export default function UserProfilePage() {
  const router = useRouter();
   const [data , setData]=React.useState("nothing ")
  const onLogout = async () => {
    try {
     console.log("buttton is clickeed")
      await axios.get("/api/users/logout");

      toast.success("Logout Successful");

      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
 const getUser = async() =>{
try {
  const res = await axios.get('/api/user/me')
   setData(res.data.data)
} catch (error:any) {
  console.log(error.message);
  toast.error(error.message)
  
}
 }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">
          Profile
        </h1>

        <hr className="mb-6 border-gray-300" />

        <p className="text-lg text-gray-700">
          Welcome to your profile
        </p>
        <h2 className="rounded bg-amber-500 p-1">
  {data === "nothing" ? (
    "Nothing"
  ) : (
    <Link href={`/profile/${data}`}>
      {data}
    </Link>
  )}
</h2>

        <div className="mt-6">
          <span className="text-gray-500">User ID</span>

          <div className="mt-2 inline-block rounded-lg bg-red-500 px-4 py-2 text-lg font-semibold text-yellow-300 shadow-md">
            {/* User ID will appear here */}
          </div>

          <button
            onClick={onLogout}
            className="mt-8 w-full rounded-lg bg-red-600 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-red-700"
          >
            Logout
          </button>
          <button
            onClick={getUser}
            className="mt-8 w-full rounded-lg bg-red-600 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-red-700"
          >
            get user
          </button>
        </div>
      </div>
    </div>
  );
}