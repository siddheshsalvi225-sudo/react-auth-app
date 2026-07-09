"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();

  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const urlToken = searchParams.get("token");

    if (urlToken) {
      setToken(urlToken);
    }
  }, [searchParams]);

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token]);

  const verifyEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", {
        token,
      });

      setVerified(true);
      setMessage(response.data.message);
    } catch (error: any) {
      setVerified(false);
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <html>
      <body>
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <div
            style={{
              width: "400px",
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "10px",
              textAlign: "center",
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            }}
          >
            <h1>Email Verification</h1>

            <p>
              <strong>Token:</strong>
            </p>

            <p>{token || "No Token Found"}</p>

            <hr />

            {message === "" ? (
              <p>Verifying your email...</p>
            ) : verified ? (
              <p style={{ color: "green" }}>{message}</p>
            ) : (
              <p style={{ color: "red" }}>{message}</p>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}