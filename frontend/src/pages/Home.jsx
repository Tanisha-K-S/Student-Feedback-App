import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        color: "white",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "1rem" }}>
        🎓 Welcome to Feedback App
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem", maxWidth: "600px" }}>
        Share your thoughts, rate your courses, and help improve learning for
        everyone.
      </p>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link
          to="/login"
          style={{
            background: "white",
            color: "#2575fc",
            padding: "12px 24px",
            borderRadius: "8px",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Login
        </Link>
        <Link
          to="/signup"
          style={{
            background: "#ffcc00",
            color: "#333",
            padding: "12px 24px",
            borderRadius: "8px",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Signup
        </Link>
      </div>
    </div>
  );
}
